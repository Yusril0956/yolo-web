# Next.js + Notion

Setup project ini sudah terhubung ke Notion API.

## Cara pakai

1. Copy `.env.example` ke `.env.local`.
2. Isi `NOTION_API_KEY`, `NOTION_MEMBERS_DB_ID`, dan `NOTION_ACTIVITIES_DB_ID`.
3. Share database Notion ke integration yang sama.
4. Jalankan `npm run dev`.

## Yang tersedia

- Halaman utama yang membaca data `Members` dan `Activities` dari Notion.
- Endpoint debug JSON di `/api/notion`.
- Error boundary sederhana kalau env atau akses Notion gagal.

## Catatan

- Simpan secret hanya di `.env.local`.
- Kalau ID yang Anda isi ternyata adalah `database_id`, project ini akan mencoba resolve ke data source utama secara otomatis.
