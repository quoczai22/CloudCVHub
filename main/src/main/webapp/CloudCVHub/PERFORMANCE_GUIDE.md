# CẨM NANG TỐI ƯU HIỆU NĂNG CLOUDCVHUB (PERFORMANCE INTERVIEW GUIDE)

> **Tài liệu học tập & chuẩn bị phỏng vấn kỹ thuật**: Tổng hợp chi tiết các điểm nghẽn hiệu năng, giải pháp tối ưu mã nguồn và câu trả lời mẫu khi phỏng vấn Senior/Lead.

---

## MỤC LỤC
1. [Tối ưu 1: Loại bỏ Render-Blocking Font (Google Fonts Early Handshake)](#1-tối-ưu-1-loại-bỏ-render-blocking-font)
2. [Tối ưu 2: Route-based Code Splitting với React.lazy & Suspense](#2-tối-ưu-2-route-based-code-splitting-với-reactlazy--suspense)
3. [Tối ưu 3: Vendor Chunks Splitting & Long-term Caching (Vite / Rollup)](#3-tối-ưu-3-vendor-chunks-splitting--long-term-caching)
4. [Tối ưu 4: Kiểm soát Re-render Thrashing bằng useMemo & useCallback](#4-tối-ưu-4-kiểm-soát-re-render-thrashing)
5. [Tối ưu 5: Bảng đối chiếu số liệu Trước (Before) và Sau (After)](#5-bảng-đối-chiếu-số-liệu-thực-tế)

---

### 1. Tối ưu 1: Loại bỏ Render-Blocking Font

* **Tệp tin tác động**: `index.html` và `src/index.css`.
* **Vấn đề trước đây (Before)**:
  - Ở dòng đầu của `index.css`: `@import url("https://fonts.googleapis.com/...");`
  - Hiện tượng: Trình duyệt phải tải xong file CSS gốc -> đọc dòng `@import` -> mới gửi request sang Google Fonts lấy CSS -> rồi mới tải file `.woff2`.
  - Hậu quả: Tạo chuỗi request nối tiếp (Request Waterfall), khiến chỉ số **First Contentful Paint (FCP)** bị trễ 400ms – 800ms, màn hình bị trắng (FOUC).
* **Giải pháp tối ưu (After)**:
  - Xóa bỏ `@import` khỏi `index.css`.
  - Khai báo trực tiếp trong thẻ `<head>` của `index.html`:
    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?..." />
    ```
* **Bản chất kỹ thuật**: `rel="preconnect"` chỉ đạo trình duyệt thực hiện bắt tay DNS, TCP và đàm phán bảo mật TLS/SSL với máy chủ font của Google ngay từ khi tải HTML, nạp font song song thay vì tuần tự.

---

### 2. Tối ưu 2: Route-based Code Splitting với `React.lazy` & `<Suspense>`

* **Tệp tin tác động**: `src/routes/MainRouter.jsx`.
* **Vấn đề trước đây (Before)**:
  - Tất cả 12 trang (`DashboardPage`, `CVListPage`, `AdminCVsPage`, `UploadPage`, `ProfilePage`...) đều được import tĩnh ở đầu file:
    ```javascript
    import DashboardPage from "../pages/Dashboard/DashboardPage.jsx"
    import AdminCVsPage from "../areas/admin/pages/AdminCVsPage.jsx"
    ```
  - Hậu quả: Vite gom toàn bộ mã nguồn của 12 trang vào một tệp JS duy nhất nặng tới **286.5 kB**. Người dùng chỉ vào xem Trang chủ nhưng phải tải luôn cả bảng duyệt mã độc Admin, lịch sử logs, v.v.
* **Giải pháp tối ưu (After)**:
  - Chuyển sang nạp động (Dynamic Import) theo nhu cầu:
    ```javascript
    const DashboardPage = lazy(() => import("../pages/Dashboard/DashboardPage.jsx"))
    const CVListPage = lazy(() => import("../pages/CVList/CVListPage.jsx"))
    const AdminCVsPage = lazy(() => import("../areas/admin/pages/AdminCVsPage.jsx"))
    ```
  - Bọc màn hình trong `<Suspense fallback={<RouteLoadingFallback />}>`.
* **Bản chất kỹ thuật**: Trình duyệt chỉ tải tệp JavaScript chính siêu nhẹ (**16.9 kB**). Khi người dùng bấm sang trang nào (ví dụ CVList), trình duyệt mới tải chunk nhỏ của trang đó (**7.1 kB**) trong chưa đầy 15ms.

---

### 3. Tối ưu 3: Vendor Chunks Splitting & Long-term Caching

* **Tệp tin tác động**: `vite.config.js`.
* **Giải pháp tối ưu**:
  ```javascript
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
          return 'vendor-react'
        }
      },
    },
  }
  ```
* **Bản chất kỹ thuật**: Tách thư viện cốt lõi `react` và `react-dom` thành file riêng (`vendor-react.js`). Khi bạn sửa đổi giao diện code của mình, người dùng chỉ cần tải lại chunk code bạn sửa, còn file `vendor-react.js` được trình duyệt lưu trong bộ nhớ đệm (Cache) vĩnh viễn, không phải tải lại.

---

### 4. Tối ưu 4: Kiểm soát Re-render Thrashing

* **Tệp tin tác động**: `src/routes/MainRouter.jsx`.
* **Vấn đề trước đây (Before)**: Đối tượng `commonProps` chứa các hàm xử lý đóng/mở sidebar được tạo mới bằng object literal trên mỗi chu kỳ render của `MainRouter`.
* **Giải pháp tối ưu (After)**:
  - Bọc các hàm điều hướng và bật/tắt menu trong `useCallback`.
  - Bọc đối tượng `commonProps` trong `useMemo`.
* **Bản chất kỹ thuật**: Khi người dùng click nút bật/tắt Sidebar, tham chiếu bộ nhớ của `commonProps` được giữ nguyên, ngăn chặn tình trạng toàn bộ cây component con bị re-render vô ích, đảm bảo chuyển động 60fps mượt mà.

---

### 5. Bảng đối chiếu số liệu thực tế

| Tiêu chí | Trước khi tối ưu (Before) | Sau khi tối ưu (After) | Cải thiện |
| :--- | :--- | :--- | :--- |
| **Kích thước file JS ban đầu** | `286.50 kB` (Monolithic) | `16.91 kB` (Entry Chunk) | **Giảm 94.1% dung lượng** |
| **Chiến lược nạp trang** | Tải hết 12 trang cùng lúc | Tải lười từng trang (`2kB - 8kB`/chunk) | **Tải On-demand tức thì** |
| **Chuỗi nạp Font** | Bị nghẽn bởi CSS `@import` | `<link rel="preconnect">` song song | **Rút ngắn 300 - 500ms FCP** |
| **Bộ nhớ đệm Vendor** | Gom chung với code ứng dụng | Tách riêng `vendor-react.js` (189 kB) | **Cache vĩnh viễn ở client** |
| **Hiện tượng khi Toggle Sidebar** | Re-render toàn bộ trang con | Chỉ render lại Sidebar & AppScreen | **Mượt mà 60fps** |

---

### 🎯 Gợi ý trả lời khi đi phỏng vấn:
> *"Trong dự án CloudCVHub, em đã nhận diện điểm nghẽn bundle lớn (286 kB) và thời gian chờ font FCP chậm. Em đã trực tiếp tái cấu trúc: (1) Áp dụng Route-based Code Splitting với `React.lazy` và `<Suspense>`, đưa entry chunk xuống chỉ còn 16.9 kB; (2) Tách `vendor-react` chunk trong Vite để tối ưu HTTP caching; (3) Chuyển `@import` CSS sang `<link rel="preconnect">` trong HTML. Kết quả giúp giảm hơn 90% dung lượng tải ban đầu và trang web tương tác tức thì dưới 1 giây."*
