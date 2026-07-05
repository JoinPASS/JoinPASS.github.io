+++
title = "存取規劃"
description = "PASS 公開網站、Google Drive 內部文件，以及未來私有網頁的認證與白名單方向。"
icon = "lock"
weight = 200
toc = true
+++

這個網站的初版只放 PASS 的公開資訊。內部非公開資料會依資料型態採取不同控管方式。

## 公開網站

公開網站由這個 repository 產生，透過 Hugo 與 Lotus Docs 建置，並由 Vercel 部署。

公開內容包含：

- 社群定位
- 初版社群規範
- 對外說明
- 後續存取規劃

## 內部非網頁文件

非公開且不是網頁的文件，會存放在 Google Drive 中，以便使用 Google 帳號或 Google Workspace 權限控管。

這類文件不會直接放進公開網站 repository。

## 內部私有網頁

內部非公開網頁會採用 Google account 認證，並透過 Supabase 管理白名單與角色。初版內部區會先提供 Calendar 與文件區的入口連結；實際 Calendar 與 Google Drive 的存取權限仍由 Google 端控管。

初步角色分為：

- `admin`：可以新增、移除與調整白名單使用者。
- `member`：可以存取已授權的私有頁面。

授權判斷必須以伺服器端或 Supabase 中受保護的資料為準，不依賴使用者可自行修改的 metadata。

## 目前狀態

此初版正在建立 Google account 認證、Supabase 白名單與管理者介面。Calendar 與文件區目前僅作為內部成員登入後才能讀取的外部連結，未串接 Google Calendar 或 Google Drive API。
