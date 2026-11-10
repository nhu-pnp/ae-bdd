# Coding Standards — ae-bdd

Hệ quy chiếu chung khi viết automation (Playwright + playwright-bdd) cho automationexercise.com.

## 1. Chọn locator

### Thứ tự ưu tiên (dễ maintain → khó)

| Ưu tiên | Locator                          | Dùng khi                                                                | Ví dụ                                                  |
| ------- | -------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------ |
| 1       | `getByRole`                      | Nút, link, heading, radio, checkbox có tên rõ ràng và **duy nhất**      | `page.getByRole('button', { name: 'Create Account' })` |
| 2       | `getByLabel`                     | Input/checkbox có label riêng, không trùng                              | `page.getByLabel('Sign up for our newsletter!')`       |
| 3       | `getByTestId`                    | Role/label bị trùng hoặc không có (form field, select)                  | `page.getByTestId('signup-email')`                     |
| 4       | `getByPlaceholder` / `getByText` | Chỉ khi 3 cách trên không dùng được và text là duy nhất                 | `header.getByText('Logged in as')`                     |
| 5       | CSS / XPath                      | **Hạn chế tối đa**. Chỉ dùng khi không còn cách nào, phải comment lý do | `page.locator('#slider')`                              |

### Quy tắc

- `testIdAttribute` đã được cấu hình là `data-qa` trong `playwright.config.ts`, nên **dùng `getByTestId('x')`, không viết `locator('[data-qa="x"]')`**.
- Locator phải khớp **đúng 1 phần tử** (Playwright strict mode). Khi tên có thể khớp một phần (vd. "Mr" khớp cả "Mrs."), thêm `{ exact: true }`.
- Không dựa vào class CSS, thứ tự phần tử (`nth`, `:nth-child`) hay cấu trúc lồng nhau (`div > span`).
- Thu hẹp phạm vi khi trang có nhiều vùng giống nhau: `page.locator('#header').getByRole('link', { name: 'Logout' })`.
- Luôn kiểm tra selector trên trang thật trước khi commit.

## 2. Page Object (`tests/pages/`)

- Mỗi trang/component là 1 class. File đặt tên `<ten-trang>.page.ts`; component đặt trong `tests/pages/components/`.
- Locator khai báo là `readonly` field và khởi tạo trong constructor.
- Method thể hiện **hành động của người dùng** (`fillSignup`, `clickContinue`) hoặc **kiểm tra trạng thái trang** (`expectOpened`).
- Mỗi page có `expectOpened()` để kiểm tra URL và một phần tử đặc trưng.
- Page object không chứa logic của test case và không đọc `world`.

## 3. Step definitions (`tests/steps/`)

- Mỗi câu Gherkin có đúng 1 step. Step chỉ gọi page object, **không viết locator trực tiếp trong step**.
- Assertion dùng `expect` của `@playwright/test` (web-first, tự chờ).
- Step dùng chung giữa nhiều scenario phải viết sao cho không phụ thuộc scenario cụ thể.
- Lấy dữ liệu dùng chung qua `world` (vd. helper `currentUser()`), không dùng biến toàn cục tự tạo.

## 4. Test data, World và Hooks

- Tạo dữ liệu bằng factory trong `tests/data/` (vd. `createUser()`), email phải duy nhất.
- Dữ liệu tạo ra trong scenario lưu vào `world`. Mọi account tạo ra phải được push vào `world.accountsToDelete` **ngay khi tạo**.
- `Before` reset `world`; `After` dọn dữ liệu qua API. Nếu dọn thất bại thì chỉ log cảnh báo, không làm fail test.

## 5. Feature file (`tests/features/`)

- Tag mã Squash: `@TC-SQUASH-<id>`, tag story: `@REG-001`; thêm `@smoke` / `@regression` khi phù hợp.
- Comment đầu feature ghi rõ ánh xạ với các bước trong Squash.
- Câu Gherkin viết theo ngôn ngữ người dùng, không nhắc tới selector hay chi tiết kỹ thuật.

## 6. Trước khi commit

```bash
npm run typecheck
```

```bash
npx prettier --check .
```

```bash
TAGS=@TC-SQUASH-<id> npx bddgen && npx playwright test --grep @TC-SQUASH-<id>
```
