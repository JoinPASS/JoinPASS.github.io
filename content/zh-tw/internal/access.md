+++
title = "存取規劃"
description = "PASS 內部資源的存取安排與責任分工。"
eyebrow = "Members only"
lead = "這份文件說明 PASS 目前如何區分公開資訊、內部非網頁文件，以及需要登入的內部網頁。"
internalMode = "document"
outputs = ["HTML"]

[sitemap]
disable = true

[build]
list = "never"
+++

PASS 會把不同類型的內容放在不同邊界內管理，讓公開說明、日常協作與權限治理各自保持清楚。

## 公開網站

公開網站由這個 repository 產生，透過 Hugo 與 Lotus Docs 建置，並由 Vercel 部署。

公開首頁主要負責：

- 說明 PASS 的定位與社群規劃
- 提供可對外說明的運作原則
- 作為未來對外摘要與公開資訊的入口

## 內部非網頁文件

非公開且不是網頁的文件，會持續放在 Google Drive 中。

這樣做的原因是：

- 方便用 Google 帳號或 Google Workspace 權限做存取控管
- 方便成員共同編修與版本維護
- 不把私有文件放入公開網站 repository

## 內部私有網頁

需要登入才能查看的網頁，使用 Google account 認證搭配 Supabase 白名單授權。

目前的基本角色區分如下：

- `admin`：可以新增、停用、調整白名單帳號與角色
- `member`：可以讀取已授權的內部頁面與入口連結

## 目前的內部入口

現階段內部區先提供：

- Google Calendar 入口
- Google Drive 文件區入口
- 帳號管理頁面（限管理員）

Calendar 與 Drive 的實際檔案或行事曆權限，仍然由 Google 端管理；網站只提供通往資源的受保護入口。
