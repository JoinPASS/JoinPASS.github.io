import { createClient } from "@supabase/supabase-js";

const config = readConfig();
const labels = getLabels(config.lang);
const state = {
  supabase: null,
  user: null,
  member: null,
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

async function init() {
  bindText();
  bindAccountMenu();

  if (!config.supabaseUrl || !config.supabasePublishableKey) {
    renderLoggedOut();
    showAlert(labels.configMissing, "warning");
    return;
  }

  state.supabase = createClient(config.supabaseUrl, config.supabasePublishableKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: false,
      flowType: "pkce",
      persistSession: true,
    },
  });

  bindAuthButtons();
  bindAdminForm();

  try {
    await handleOAuthCallback();
    await refreshState();
  } catch (error) {
    showAlert(readError(error), "warning");
    renderLoggedOut();
  }
}

function readConfig() {
  const element = document.getElementById("joinpass-internal-config");
  if (!element) {
    return {};
  }

  try {
    const parsed = JSON.parse(element.textContent || "{}");
    return typeof parsed === "string" ? JSON.parse(parsed) : parsed;
  } catch {
    return {};
  }
}

function getLabels(lang) {
  const normalized = (lang || "en").toLowerCase();
  const zh = {
    accountFallback: "帳號",
    accountType: "帳號種類",
    addMembers: "新增帳號",
    addMembersCopy: "每行輸入一個 Google 帳號。新增後預設啟用，並會記錄執行新增的管理員資訊。",
    addMembersKicker: "Whitelist",
    addMembersTitle: "新增白名單",
    addSuccess: "已更新白名單。",
    admin: "管理員",
    adminArea: "帳號管理",
    calendar: "Calendar",
    configMissing: "Supabase publishable key 尚未設定。請先在 Vercel 環境變數設定 HUGO_PARAMS_SUPABASE_PUBLISHABLEKEY。",
    created: "加入日期",
    createdBy: "加入帳號的管理員",
    dashboardKicker: "Internal resources",
    dashboardTitle: "內部資源",
    disabled: "已停用",
    documents: "文件區",
    email: "帳號",
    emailInput: "Google 帳號清單",
    emailInputPlaceholder: "member1@example.com\nmember2@example.com",
    enable: "啟用",
    disable: "停用",
    forbidden: "此頁面僅限管理員使用。",
    invalidEmails: "請至少輸入一個有效 email。",
    loading: "讀取中...",
    login: "使用 Google 登入",
    loginCopy: "請使用已列入白名單的 Google 帳號登入。登入後才能讀取內部資源連結。",
    loginKicker: "Google account required",
    loginPrompt: "尚未登入",
    loginTitle: "請先登入",
    logout: "Logout",
    member: "一般會員",
    memberListKicker: "Members",
    memberListTitle: "目前會員清單",
    name: "姓名",
    noResources: "目前沒有可顯示的內部資源。",
    notWhitelisted: "這個 Google 帳號尚未列入 PASS 內部區白名單。",
    role: "帳號種類",
    saved: "已儲存。",
    status: "狀態",
    actions: "操作",
    active: "啟用中",
    unknownAdmin: "未記錄",
  };

  const en = {
    accountFallback: "Account",
    accountType: "Account type",
    addMembers: "Add accounts",
    addMembersCopy: "Enter one Google account per line. New accounts are activated immediately and the adding administrator is recorded.",
    addMembersKicker: "Whitelist",
    addMembersTitle: "Add whitelist entries",
    addSuccess: "Whitelist updated.",
    admin: "Admin",
    adminArea: "Account management",
    calendar: "Calendar",
    configMissing: "Supabase publishable key is not configured. Set HUGO_PARAMS_SUPABASE_PUBLISHABLEKEY in Vercel first.",
    created: "Joined",
    createdBy: "Added by",
    dashboardKicker: "Internal resources",
    dashboardTitle: "Internal resources",
    disabled: "Disabled",
    documents: "Documents",
    email: "Account",
    emailInput: "Google account list",
    emailInputPlaceholder: "member1@example.com\nmember2@example.com",
    enable: "Enable",
    disable: "Disable",
    forbidden: "This page is only available to administrators.",
    invalidEmails: "Enter at least one valid email.",
    loading: "Loading...",
    login: "Sign in with Google",
    loginCopy: "Use a whitelisted Google account to sign in. Internal links are loaded only after authorization.",
    loginKicker: "Google account required",
    loginPrompt: "Not signed in",
    loginTitle: "Sign in required",
    logout: "Logout",
    member: "Member",
    memberListKicker: "Members",
    memberListTitle: "Current member list",
    name: "Name",
    noResources: "No internal resources are available yet.",
    notWhitelisted: "This Google account is not on the PASS internal whitelist.",
    role: "Account type",
    saved: "Saved.",
    status: "Status",
    actions: "Actions",
    active: "Active",
    unknownAdmin: "Not recorded",
  };

  return normalized.startsWith("zh") ? zh : en;
}

function bindText() {
  setText("[data-jp-login-kicker]", labels.loginKicker);
  setText("[data-jp-login-title]", labels.loginTitle);
  setText("[data-jp-login-copy]", labels.loginCopy);
  setText("[data-jp-login-label]", labels.login);
  setText("[data-jp-menu-login-label]", labels.login);
  setText("[data-jp-logout-label]", labels.logout);
  setText("[data-jp-admin-link-label]", labels.adminArea);
  setText("[data-jp-account-type-label]", labels.accountType);
  setText("[data-jp-dashboard-kicker]", labels.dashboardKicker);
  setText("[data-jp-dashboard-title]", labels.dashboardTitle);
  setText("[data-jp-admin-form-kicker]", labels.addMembersKicker);
  setText("[data-jp-admin-form-title]", labels.addMembersTitle);
  setText("[data-jp-admin-form-copy]", labels.addMembersCopy);
  setText("[data-jp-admin-emails-label]", labels.emailInput);
  setText("[data-jp-admin-role-label]", labels.role);
  setText("[data-jp-admin-add-label]", labels.addMembers);
  setText("[data-jp-role-member]", labels.member);
  setText("[data-jp-role-admin]", labels.admin);
  setText("[data-jp-member-list-kicker]", labels.memberListKicker);
  setText("[data-jp-member-list-title]", labels.memberListTitle);
  setText("[data-jp-th-name]", labels.name);
  setText("[data-jp-th-email]", labels.email);
  setText("[data-jp-th-role]", labels.role);
  setText("[data-jp-th-status]", labels.status);
  setText("[data-jp-th-created]", labels.created);
  setText("[data-jp-th-created-by]", labels.createdBy);
  setText("[data-jp-th-actions]", labels.actions);

  const textarea = document.querySelector("[data-jp-member-emails]");
  if (textarea) {
    textarea.placeholder = labels.emailInputPlaceholder;
  }
}

function bindAccountMenu() {
  const button = document.querySelector("[data-jp-account-button]");
  const menu = document.querySelector("[data-jp-account-menu]");
  if (!button || !menu) {
    return;
  }

  button.addEventListener("click", () => {
    const isHidden = menu.hidden;
    menu.hidden = !isHidden;
    button.setAttribute("aria-expanded", String(isHidden));
  });

  document.addEventListener("click", (event) => {
    const account = document.querySelector("[data-jp-account]");
    if (!account || account.contains(event.target)) {
      return;
    }
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
  });
}

function bindAuthButtons() {
  document.querySelectorAll("[data-jp-login], [data-jp-menu-login]").forEach((button) => {
    button.addEventListener("click", signIn);
  });

  document.querySelectorAll("[data-jp-logout]").forEach((button) => {
    button.addEventListener("click", signOut);
  });
}

function bindAdminForm() {
  const form = document.querySelector("[data-jp-member-form]");
  if (!form) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await addMembers();
  });
}

async function handleOAuthCallback() {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const errorDescription = url.searchParams.get("error_description");

  if (errorDescription) {
    cleanAuthUrl(url);
    throw new Error(errorDescription);
  }

  if (!code) {
    return;
  }

  const { error } = await state.supabase.auth.exchangeCodeForSession(code);
  cleanAuthUrl(url);

  if (error) {
    throw error;
  }
}

function cleanAuthUrl(url) {
  ["code", "state", "error", "error_description"].forEach((key) => {
    url.searchParams.delete(key);
  });
  const clean = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState({}, document.title, clean);
}

async function refreshState() {
  hideAlert();
  const {
    data: { session },
  } = await state.supabase.auth.getSession();

  if (!session) {
    renderLoggedOut();
    return;
  }

  const {
    data: { user },
    error: userError,
  } = await state.supabase.auth.getUser();

  if (userError || !user) {
    throw userError || new Error(labels.loginPrompt);
  }

  state.user = user;
  renderSignedInShell();

  const member = await loadCurrentMember(user);
  if (!member) {
    renderUnauthorized();
    return;
  }

  state.member = member;
  renderAuthorizedAccount();

  if (config.page === "admin") {
    if (member.role !== "admin") {
      renderForbidden();
      return;
    }
    await renderAdmin();
    return;
  }

  await renderDashboard();
}

async function loadCurrentMember(user) {
  const email = normalizeEmail(user.email);
  if (!email) {
    return null;
  }

  const { data, error } = await state.supabase
    .from("joinpass_members")
    .select("id,email,display_name,role,status,created_at,created_by_email,created_by_name")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data || data.status !== "active") {
    return null;
  }

  return data;
}

async function renderDashboard() {
  showElement("[data-jp-login-panel]", false);
  showElement("[data-jp-member-panel]", true);

  const { data, error } = await state.supabase
    .from("joinpass_internal_resources")
    .select("resource_key,resource_type,title_zh_tw,title_en,description_zh_tw,description_en,url,icon,display_order")
    .eq("enabled", true)
    .order("display_order", { ascending: true });

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    showAlert(labels.noResources, "warning");
    return;
  }

  data.forEach(renderResource);
}

function renderResource(resource) {
  const card = document.querySelector(`[data-jp-resource-card="${resource.resource_key}"]`);
  if (!card) {
    return;
  }

  const icon = card.querySelector(".material-icons");
  const title = card.querySelector("[data-jp-resource-title]");
  const description = card.querySelector("[data-jp-resource-description]");
  const useZh = (config.lang || "").toLowerCase().startsWith("zh");

  card.href = resource.url;
  if (icon) {
    icon.textContent = resource.icon || "link";
  }
  if (title) {
    title.textContent = useZh ? resource.title_zh_tw : resource.title_en;
  }
  if (description) {
    description.textContent = useZh ? resource.description_zh_tw : resource.description_en;
  }
}

async function renderAdmin() {
  showElement("[data-jp-login-panel]", false);
  showElement("[data-jp-admin-panel]", true);
  await loadMembers();
}

async function loadMembers() {
  const { data, error } = await state.supabase
    .from("joinpass_members")
    .select("id,email,display_name,role,status,created_at,created_by_email,created_by_name")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  renderMembers(data || []);
}

function renderMembers(members) {
  const body = document.querySelector("[data-jp-members-body]");
  if (!body) {
    return;
  }

  body.replaceChildren();

  members.forEach((member) => {
    const row = document.createElement("tr");
    row.append(
      cell(member.display_name || splitEmailName(member.email)),
      cell(member.email, "jp-member-email"),
      roleCell(member),
      statusCell(member.status),
      cell(formatDate(member.created_at)),
      cell(formatAddedBy(member), "jp-member-created-by"),
      actionCell(member),
    );
    body.append(row);
  });
}

function roleCell(member) {
  const td = document.createElement("td");
  const select = document.createElement("select");
  select.className = "jp-inline-select";
  select.disabled = isSelf(member.email);
  select.append(option("member", labels.member), option("admin", labels.admin));
  select.value = member.role;
  select.addEventListener("change", async () => {
    await updateMember(member.email, { role: select.value });
  });
  td.append(select);
  return td;
}

function statusCell(status) {
  const td = document.createElement("td");
  const badge = document.createElement("span");
  badge.className = `jp-status jp-status-${status}`;
  badge.textContent = status === "active" ? labels.active : labels.disabled;
  td.append(badge);
  return td;
}

function actionCell(member) {
  const td = document.createElement("td");
  const button = document.createElement("button");
  button.className = "jp-action-button";
  button.type = "button";
  button.disabled = isSelf(member.email);
  button.textContent = member.status === "active" ? labels.disable : labels.enable;
  button.addEventListener("click", async () => {
    await updateMember(member.email, {
      status: member.status === "active" ? "disabled" : "active",
    });
  });
  td.append(button);
  return td;
}

async function addMembers() {
  const textarea = document.querySelector("[data-jp-member-emails]");
  const role = document.querySelector("[data-jp-member-role]")?.value || "member";
  const emails = parseEmails(textarea?.value || "");

  if (emails.length === 0) {
    showAlert(labels.invalidEmails, "warning");
    return;
  }

  const rows = emails.map((email) => ({
    email,
    role,
    status: "active",
  }));

  const { error } = await state.supabase
    .from("joinpass_members")
    .upsert(rows, { onConflict: "email" });

  if (error) {
    showAlert(readError(error), "warning");
    return;
  }

  if (textarea) {
    textarea.value = "";
  }

  showAlert(labels.addSuccess, "success");
  await loadMembers();
}

async function updateMember(email, changes) {
  const { error } = await state.supabase
    .from("joinpass_members")
    .update(changes)
    .eq("email", normalizeEmail(email));

  if (error) {
    showAlert(readError(error), "warning");
    return;
  }

  showAlert(labels.saved, "success");
  await loadMembers();
}

async function signIn() {
  if (!state.supabase) {
    showAlert(labels.configMissing, "warning");
    return;
  }

  const redirectTo = new URL(window.location.href);
  redirectTo.search = "";
  redirectTo.hash = "";

  const { error } = await state.supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectTo.toString(),
      scopes: "openid email profile",
    },
  });

  if (error) {
    showAlert(readError(error), "warning");
  }
}

async function signOut() {
  if (!state.supabase) {
    return;
  }

  await state.supabase.auth.signOut();
  state.user = null;
  state.member = null;
  renderLoggedOut();
}

function renderLoggedOut() {
  state.user = null;
  state.member = null;
  showElement("[data-jp-login-panel]", true);
  showElement("[data-jp-member-panel]", false);
  showElement("[data-jp-admin-panel]", false);
  setAccount({
    label: labels.loginPrompt,
    name: labels.loginPrompt,
    email: "",
    type: labels.loginPrompt,
    loggedIn: false,
    admin: false,
  });
}

function renderSignedInShell() {
  setAccount({
    label: state.user.email || labels.accountFallback,
    name: displayName(state.user),
    email: state.user.email || "",
    type: labels.loading,
    loggedIn: true,
    admin: false,
    avatar: state.user.user_metadata?.avatar_url,
  });
}

function renderAuthorizedAccount() {
  const isAdmin = state.member?.role === "admin";
  setAccount({
    label: state.member?.display_name || state.user.email || labels.accountFallback,
    name: state.member?.display_name || displayName(state.user),
    email: state.user.email || state.member?.email || "",
    type: isAdmin ? labels.admin : labels.member,
    loggedIn: true,
    admin: isAdmin,
    avatar: state.user.user_metadata?.avatar_url,
  });
}

function renderUnauthorized() {
  showElement("[data-jp-login-panel]", false);
  showElement("[data-jp-member-panel]", false);
  showElement("[data-jp-admin-panel]", false);
  showAlert(labels.notWhitelisted, "warning");
  setAccount({
    label: state.user.email || labels.accountFallback,
    name: displayName(state.user),
    email: state.user.email || "",
    type: labels.notWhitelisted,
    loggedIn: true,
    admin: false,
    avatar: state.user.user_metadata?.avatar_url,
  });
}

function renderForbidden() {
  showElement("[data-jp-login-panel]", false);
  showElement("[data-jp-member-panel]", false);
  showElement("[data-jp-admin-panel]", false);
  showAlert(labels.forbidden, "warning");
}

function setAccount(details) {
  setText("[data-jp-account-label]", details.label);
  setText("[data-jp-account-name]", details.name || details.label);
  setText("[data-jp-account-email]", details.email || "");
  setText("[data-jp-account-type]", details.type || "");
  showElement("[data-jp-admin-link]", Boolean(details.admin));
  showElement("[data-jp-menu-login]", !details.loggedIn);
  showElement("[data-jp-logout]", Boolean(details.loggedIn));

  const avatar = document.querySelector("[data-jp-account-avatar]");
  if (!avatar) {
    return;
  }

  avatar.replaceChildren();
  if (details.avatar) {
    const image = document.createElement("img");
    image.alt = "";
    image.referrerPolicy = "no-referrer";
    image.src = details.avatar;
    avatar.append(image);
  } else {
    const icon = document.createElement("span");
    icon.className = "material-icons";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "account_circle";
    avatar.append(icon);
  }
}

function setText(selector, text) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = text;
  });
}

function showElement(selector, visible) {
  document.querySelectorAll(selector).forEach((element) => {
    element.hidden = !visible;
  });
}

function showAlert(message, tone) {
  const alert = document.querySelector("[data-jp-alert]");
  if (!alert) {
    return;
  }

  alert.textContent = message;
  alert.dataset.tone = tone || "warning";
  alert.hidden = false;
}

function hideAlert() {
  const alert = document.querySelector("[data-jp-alert]");
  if (alert) {
    alert.hidden = true;
  }
}

function parseEmails(value) {
  const emails = value
    .split(/\r?\n/)
    .map((line) => line.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0])
    .filter(Boolean)
    .map(normalizeEmail);

  return [...new Set(emails)];
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function splitEmailName(email) {
  return String(email || "").split("@")[0] || "";
}

function displayName(user) {
  return (
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email ||
    labels.accountFallback
  );
}

function isSelf(email) {
  return normalizeEmail(email) === normalizeEmail(state.user?.email);
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const locale = (config.lang || "").toLowerCase().startsWith("zh") ? "zh-TW" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeZone: "Asia/Taipei",
  }).format(new Date(value));
}

function formatAddedBy(member) {
  const name = member.created_by_name || "";
  const email = member.created_by_email || "";
  if (!name && !email) {
    return labels.unknownAdmin;
  }
  if (name && email) {
    return `${name} (${email})`;
  }
  return name || email;
}

function cell(text, className) {
  const td = document.createElement("td");
  if (className) {
    td.className = className;
  }
  td.textContent = text || "";
  return td;
}

function option(value, text) {
  const item = document.createElement("option");
  item.value = value;
  item.textContent = text;
  return item;
}

function readError(error) {
  if (!error) {
    return labels.configMissing;
  }
  return error.message || String(error);
}
