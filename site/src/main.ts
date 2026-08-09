// Source of truth for the gallery. Run `pnpm build` after editing this file.
const MANIFEST_PATH = "../asset/asoul_clothing_refs/manifest.json";

type Member = "Bella" | "Diana" | "Eileen";
type MemberFilter = Member | "all";
type YearFilter = `${number}` | "all" | "unknown";
type SortMode = "newest" | "member" | "title" | "size";
type SourceConfidence = "official" | "hd_traceable" | "verified_secondary" | "needs_review";

interface MemberMeta {
  zh: string;
  accent: string;
  accentSoft: string;
}

interface ManifestAsset {
  id?: string;
  member: string;
  member_key?: string;
  source_section?: string;
  outfit?: string;
  caption_zh?: string;
  path: string;
  source_page?: string | null;
  source_file_page?: string | null;
  source_url?: string | null;
  first_appearance_year?: number | null;
  first_appearance_date?: string | null;
  first_appearance_source_url?: string | null;
  source_confidence?: SourceConfidence;
  width?: number;
  height?: number;
  bytes?: number;
  sha256?: string;
  pixel_design_notes?: string[];
}

interface NormalizedAsset extends ManifestAsset {
  _index: number;
  _title: string;
  _subtitle: string;
  _memberZh: string;
  _accent: string;
  _accentSoft: string;
  _year: number | null;
  _yearLabel: string;
  _imagePath: string;
  _sourceLabel: string;
  _area: number;
  _searchText: string;
}

interface Manifest {
  counts?: {
    total_assets?: number;
    by_member?: Partial<Record<Lowercase<Member>, number>>;
  };
  assets?: ManifestAsset[];
}

interface GalleryState {
  assets: NormalizedAsset[];
  filteredAssets: NormalizedAsset[];
  years: number[];
  member: MemberFilter;
  year: YearFilter;
  query: string;
  sort: SortMode;
}

const MEMBER_META: Record<Member, MemberMeta> = {
  Bella: { zh: "贝拉", accent: "#839b3c", accentSoft: "rgba(131, 155, 60, 0.18)" },
  Diana: { zh: "嘉然", accent: "#d89b3b", accentSoft: "rgba(216, 155, 59, 0.18)" },
  Eileen: { zh: "乃琳", accent: "#d26d68", accentSoft: "rgba(210, 109, 104, 0.18)" },
};

const SOURCE_LABELS: Record<SourceConfidence, string> = {
  official: "官方",
  hd_traceable: "高清可追溯",
  verified_secondary: "二级核验",
  needs_review: "待核验",
};

const state: GalleryState = {
  assets: [],
  filteredAssets: [],
  years: [],
  member: "all",
  year: "all",
  query: "",
  sort: "newest",
};

const elements = {
  summaryCards: queryElement<HTMLElement>("#summary-cards"),
  spotlightGrid: queryElement<HTMLElement>("#spotlight-grid"),
  memberFilters: queryElement<HTMLElement>("#member-filters"),
  yearFilters: queryElement<HTMLElement>("#year-filters"),
  searchInput: queryElement<HTMLInputElement>("#search-input"),
  sortSelect: queryElement<HTMLSelectElement>("#sort-select"),
  resultsMeta: queryElement<HTMLElement>("#results-meta"),
  galleryGrid: queryElement<HTMLElement>("#gallery-grid"),
  cardTemplate: queryElement<HTMLTemplateElement>("#card-template"),
  modal: queryElement<HTMLElement>("#detail-modal"),
  modalClose: queryElement<HTMLButtonElement>("#detail-close"),
  detailImage: queryElement<HTMLImageElement>("#detail-image"),
  detailTitle: queryElement<HTMLElement>("#detail-title"),
  detailSubtitle: queryElement<HTMLElement>("#detail-subtitle"),
  detailBadges: queryElement<HTMLElement>("#detail-badges"),
  detailGrid: queryElement<HTMLElement>("#detail-grid"),
  detailFileLink: queryElement<HTMLAnchorElement>("#detail-file-link"),
  detailSourceLink: queryElement<HTMLAnchorElement>("#detail-source-link"),
};

void init();

async function init(): Promise<void> {
  bindEvents();
  hydrateStateFromQuery();

  try {
    const response = await fetch(MANIFEST_PATH);
    if (!response.ok) {
      throw new Error(`Failed to load manifest: ${response.status}`);
    }

    const manifest = (await response.json()) as Manifest;
    state.assets = normalizeAssets(manifest.assets || []);
    state.years = collectYears(state.assets);

    renderSummary(manifest);
    renderYearFilters();
    renderSpotlights();
    applyFilters();
  } catch (error) {
    renderFatal(String(error));
  }
}

function bindEvents(): void {
  elements.memberFilters.addEventListener("click", (event) => {
    const button = getClosestButton(event.target, "[data-member]");
    if (!button) {
      return;
    }

    state.member = parseMemberFilter(button.dataset.member);
    syncMemberButtons();
    applyFilters();
  });

  elements.yearFilters.addEventListener("click", (event) => {
    const button = getClosestButton(event.target, "[data-year]");
    if (!button) {
      return;
    }

    state.year = parseYearFilter(button.dataset.year);
    syncYearButtons();
    applyFilters();
  });

  elements.searchInput.addEventListener("input", () => {
    state.query = elements.searchInput.value.trim();
    applyFilters();
  });

  elements.sortSelect.addEventListener("change", () => {
    state.sort = parseSortMode(elements.sortSelect.value);
    applyFilters();
  });

  elements.modal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.close === "true") {
      closeModal();
    }
  });

  elements.modalClose.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.modal.hidden) {
      closeModal();
    }
  });
}

function hydrateStateFromQuery(): void {
  const params = new URLSearchParams(window.location.search);
  state.member = parseMemberFilter(params.get("member"));
  state.year = parseYearFilter(params.get("year"));
  state.query = params.get("q") || "";
  state.sort = parseSortMode(params.get("sort"));

  elements.searchInput.value = state.query;
  elements.sortSelect.value = state.sort;
  syncMemberButtons();
}

function syncQueryString(): void {
  const params = new URLSearchParams();

  if (state.member !== "all") {
    params.set("member", state.member);
  }
  if (state.year !== "all") {
    params.set("year", state.year);
  }
  if (state.query) {
    params.set("q", state.query);
  }
  if (state.sort !== "newest") {
    params.set("sort", state.sort);
  }

  const next = params.toString();
  const url = next ? `${window.location.pathname}?${next}` : window.location.pathname;
  window.history.replaceState({}, "", url);
}

function normalizeAssets(assets: ManifestAsset[]): NormalizedAsset[] {
  return assets.map((asset, index) => {
    const memberMeta = getMemberMeta(asset.member) || {
      zh: asset.member || "未知成员",
      accent: "#6a5440",
      accentSoft: "rgba(106, 84, 56, 0.18)",
    };
    const derivedYear = deriveYear(asset);
    const title = asset.caption_zh || asset.outfit || asset.id || "未命名素材";
    const subtitle = [memberMeta.zh, asset.outfit].filter(Boolean).join(" / ");
    const imagePath = `../asset/asoul_clothing_refs/${asset.path}`;

    return {
      ...asset,
      _index: index,
      _title: title,
      _subtitle: subtitle,
      _memberZh: memberMeta.zh,
      _accent: memberMeta.accent,
      _accentSoft: memberMeta.accentSoft,
      _year: derivedYear,
      _yearLabel: derivedYear ? String(derivedYear) : "未知年份",
      _imagePath: imagePath,
      _sourceLabel: asset.source_confidence
        ? SOURCE_LABELS[asset.source_confidence]
        : "历史素材",
      _area: Number(asset.width || 0) * Number(asset.height || 0),
      _searchText: [
        asset.id,
        asset.member,
        memberMeta.zh,
        asset.outfit,
        asset.caption_zh,
        asset.path,
        asset.first_appearance_year,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase(),
    };
  });
}

function deriveYear(asset: ManifestAsset): number | null {
  if (Number.isInteger(asset.first_appearance_year)) {
    return asset.first_appearance_year ?? null;
  }

  if (typeof asset.first_appearance_date === "string") {
    const dateMatch = asset.first_appearance_date.match(/^(\d{4})/);
    if (dateMatch) {
      return Number(dateMatch[1]);
    }
  }

  const probe = [
    asset.id,
    asset.path,
    asset.outfit,
    asset.caption_zh,
    asset.source_url,
  ]
    .filter(Boolean)
    .join(" ");
  const match = probe.match(/\b(20\d{2})\b/);
  return match ? Number(match[1]) : null;
}

function collectYears(assets: NormalizedAsset[]): number[] {
  const unique = new Set(
    assets.map((asset) => asset._year).filter((year): year is number => Number.isInteger(year))
  );
  return Array.from(unique).sort((left, right) => right - left);
}

function renderSummary(manifest: Manifest): void {
  const stats = [
    { label: "总素材", value: manifest.counts?.total_assets ?? state.assets.length, accent: "#35291e" },
    { label: "贝拉", value: manifest.counts?.by_member?.bella ?? 0, accent: MEMBER_META.Bella.accent },
    { label: "嘉然", value: manifest.counts?.by_member?.diana ?? 0, accent: MEMBER_META.Diana.accent },
    { label: "乃琳", value: manifest.counts?.by_member?.eileen ?? 0, accent: MEMBER_META.Eileen.accent },
  ];

  elements.summaryCards.innerHTML = stats
    .map(
      (stat) => `
        <article class="summary-card" style="--accent: ${stat.accent}">
          <span class="summary-card__label">${escapeHtml(stat.label)}</span>
          <strong class="summary-card__value">${escapeHtml(String(stat.value))}</strong>
        </article>
      `
    )
    .join("");
}

function renderYearFilters(): void {
  const buttons = ['<button class="chip" data-year="all" type="button">全部</button>'];

  state.years.forEach((year) => {
    buttons.push(
      `<button class="chip" data-year="${year}" type="button">${year}</button>`
    );
  });

  buttons.push('<button class="chip" data-year="unknown" type="button">未知</button>');
  elements.yearFilters.innerHTML = buttons.join("");
  syncYearButtons();
}

function renderSpotlights(): void {
  const members: Member[] = ["Bella", "Diana", "Eileen"];
  const spotlights = members
    .map((member) => {
      const entries = state.assets
        .filter((asset) => asset.member === member)
        .sort(compareByNewest);
      return entries[0] || null;
    })
    .filter((asset): asset is NormalizedAsset => asset !== null);

  elements.spotlightGrid.innerHTML = spotlights
    .map(
      (asset) => `
        <article class="spotlight-card" style="--accent-soft: ${asset._accentSoft}">
          <img class="spotlight-card__image" src="${asset._imagePath}" alt="${escapeHtml(asset._title)}" loading="lazy" />
          <div>
            <div class="outfit-card__badges">
              ${renderBadge(asset._memberZh, asset._accent)}
              ${renderBadge(asset._yearLabel, asset._accent)}
            </div>
            <h3 class="spotlight-card__title">${escapeHtml(asset._title)}</h3>
            <p class="spotlight-card__meta">${escapeHtml(
              `${asset._subtitle} · ${asset.width}×${asset.height}`
            )}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function applyFilters(): void {
  const query = state.query.toLowerCase();

  state.filteredAssets = state.assets
    .filter((asset) => {
      if (state.member !== "all" && asset.member !== state.member) {
        return false;
      }

      if (state.year === "unknown" && asset._year !== null) {
        return false;
      }

      if (state.year !== "all" && state.year !== "unknown" && String(asset._year) !== state.year) {
        return false;
      }

      if (query && !asset._searchText.includes(query)) {
        return false;
      }

      return true;
    })
    .sort(selectSorter(state.sort));

  renderResultsMeta();
  renderGallery();
  syncMemberButtons();
  syncYearButtons();
  syncQueryString();
}

function renderResultsMeta(): void {
  const activeFilters: string[] = [];

  if (state.member !== "all") {
    activeFilters.push(MEMBER_META[state.member].zh);
  }
  if (state.year !== "all") {
    activeFilters.push(state.year === "unknown" ? "未知年份" : `${state.year} 年`);
  }
  if (state.query) {
    activeFilters.push(`关键词: ${state.query}`);
  }

  const filterText = activeFilters.length ? activeFilters.join(" / ") : "全部素材";
  elements.resultsMeta.textContent = `当前显示 ${state.filteredAssets.length} / ${state.assets.length} 张 · ${filterText}`;
}

function renderGallery(): void {
  if (!state.filteredAssets.length) {
    elements.galleryGrid.innerHTML =
      '<div class="gallery-empty">没有匹配结果。可以换成员、年份或者缩短关键词再试。</div>';
    return;
  }

  const fragment = document.createDocumentFragment();
  const templateRoot = elements.cardTemplate.content.firstElementChild;

  if (!(templateRoot instanceof HTMLElement)) {
    throw new Error("Gallery card template is missing its root element.");
  }

  state.filteredAssets.forEach((asset) => {
    const node = templateRoot.cloneNode(true) as HTMLElement;
    const mediaButton = queryElement<HTMLButtonElement>(".outfit-card__media", node);
    const image = queryElement<HTMLImageElement>(".outfit-card__image", node);
    const badges = queryElement<HTMLElement>(".outfit-card__badges", node);
    const title = queryElement<HTMLElement>(".outfit-card__title", node);
    const meta = queryElement<HTMLElement>(".outfit-card__meta", node);

    node.style.setProperty("--accent-soft", asset._accentSoft);
    mediaButton.style.setProperty("--accent-soft", asset._accentSoft);

    image.src = asset._imagePath;
    image.alt = asset._title;
    title.textContent = asset._title;
    meta.textContent = `${asset._memberZh} · ${asset._yearLabel} · ${asset.width}×${asset.height}`;
    badges.innerHTML = [
      renderBadge(asset._memberZh, asset._accent),
      renderBadge(asset._yearLabel, asset._accent),
      renderBadge(asset._sourceLabel, "#6a5440"),
    ].join("");

    mediaButton.addEventListener("click", () => openModal(asset));
    fragment.appendChild(node);
  });

  elements.galleryGrid.innerHTML = "";
  elements.galleryGrid.appendChild(fragment);
}

function openModal(asset: NormalizedAsset): void {
  elements.detailImage.src = asset._imagePath;
  elements.detailImage.alt = asset._title;
  elements.detailTitle.textContent = asset._title;
  elements.detailSubtitle.textContent = `${asset._subtitle} · ${asset.width}×${asset.height}`;
  elements.detailBadges.innerHTML = [
    renderBadge(asset._memberZh, asset._accent),
    renderBadge(asset._yearLabel, asset._accent),
    renderBadge(asset._sourceLabel, "#6a5440"),
  ].join("");

  const rows: Array<[string, string | number]> = [
    ["文件路径", asset.path],
    ["首次出现", asset.first_appearance_date || asset.first_appearance_year || "未知"],
    ["来源类型", asset.source_section || "未标注"],
    ["来源链接", asset.source_url || "未标注"],
    ["尺寸", `${asset.width} × ${asset.height}`],
    ["文件大小", formatBytes(asset.bytes)],
    ["SHA-256", asset.sha256 || "未标注"],
  ];

  elements.detailGrid.innerHTML = rows
    .map(
      ([label, value]) => `
        <div class="detail-grid__row">
          <dt>${escapeHtml(label)}</dt>
          <dd>${escapeHtml(String(value))}</dd>
        </div>
      `
    )
    .join("");

  elements.detailFileLink.href = asset._imagePath;
  elements.detailSourceLink.href = asset.source_url || asset._imagePath;
  elements.detailSourceLink.toggleAttribute("aria-disabled", !asset.source_url);

  elements.modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal(): void {
  elements.modal.hidden = true;
  document.body.style.overflow = "";
}

function syncMemberButtons(): void {
  elements.memberFilters
    .querySelectorAll<HTMLButtonElement>("[data-member]")
    .forEach((button) => button.classList.toggle("is-active", button.dataset.member === state.member));
}

function syncYearButtons(): void {
  elements.yearFilters
    .querySelectorAll<HTMLButtonElement>("[data-year]")
    .forEach((button) => button.classList.toggle("is-active", button.dataset.year === state.year));
}

function renderFatal(message: string): void {
  elements.resultsMeta.textContent = "素材索引加载失败。";
  elements.galleryGrid.innerHTML = `<div class="gallery-empty">${escapeHtml(
    message
  )}<br />请通过本地 HTTP 服务或 GitHub Pages 打开站点，不要直接双击本地文件。</div>`;
}

function selectSorter(mode: SortMode): (left: NormalizedAsset, right: NormalizedAsset) => number {
  switch (mode) {
    case "member":
      return compareByMember;
    case "title":
      return compareByTitle;
    case "size":
      return compareBySize;
    case "newest":
    default:
      return compareByNewest;
  }
}

function compareByNewest(left: NormalizedAsset, right: NormalizedAsset): number {
  const leftYear = left._year ?? -Infinity;
  const rightYear = right._year ?? -Infinity;
  if (rightYear !== leftYear) {
    return rightYear - leftYear;
  }
  return compareByMember(left, right);
}

function compareByMember(left: NormalizedAsset, right: NormalizedAsset): number {
  const memberOrder: Record<Member, number> = { Bella: 0, Diana: 1, Eileen: 2 };
  const leftOrder = isMember(left.member) ? memberOrder[left.member] : 99;
  const rightOrder = isMember(right.member) ? memberOrder[right.member] : 99;
  const memberDelta = leftOrder - rightOrder;
  if (memberDelta !== 0) {
    return memberDelta;
  }
  return compareByTitle(left, right);
}

function compareByTitle(left: NormalizedAsset, right: NormalizedAsset): number {
  return left._title.localeCompare(right._title, "zh-CN");
}

function compareBySize(left: NormalizedAsset, right: NormalizedAsset): number {
  return right._area - left._area || compareByNewest(left, right);
}

function renderBadge(text: string, color: string): string {
  return `<span class="badge" style="--badge-text: ${color}">${escapeHtml(text)}</span>`;
}

function formatBytes(value?: number): string {
  if (!value) {
    return "未知";
  }

  const units = ["B", "KB", "MB", "GB"];
  let size = value;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function escapeHtml(value: unknown): string {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function queryElement<T extends Element>(selector: string, root: ParentNode = document): T {
  const element = root.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Required element not found: ${selector}`);
  }
  return element;
}

function getClosestButton(target: EventTarget | null, selector: string): HTMLButtonElement | null {
  return target instanceof Element ? target.closest<HTMLButtonElement>(selector) : null;
}

function isMember(value: string): value is Member {
  return value === "Bella" || value === "Diana" || value === "Eileen";
}

function getMemberMeta(member: string): MemberMeta | undefined {
  return isMember(member) ? MEMBER_META[member] : undefined;
}

function parseMemberFilter(value: string | null | undefined): MemberFilter {
  return value && isMember(value) ? value : "all";
}

function parseYearFilter(value: string | null | undefined): YearFilter {
  if (value === "unknown" || value === "all") {
    return value;
  }
  return value && /^\d{4}$/.test(value) ? (value as `${number}`) : "all";
}

function parseSortMode(value: string | null | undefined): SortMode {
  return value === "member" || value === "title" || value === "size" ? value : "newest";
}

export {};
