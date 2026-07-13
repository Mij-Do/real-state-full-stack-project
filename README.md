# 🏢 Benisuef Real-Estate Platform (MVP)

A full-stack, lightweight real estate platform tailored for Benisuef Governorate. It enables users to list their apartments and properties for sale or rent directly without traditional brokers. The platform features a robust administrative approval system to ensure listing credibility and eliminate spam.

Built with a modern serverless architecture, it delivers exceptional performance, zero hosting costs at start, and built-in support for local SEO targeting the region.

---

## 🚀 Tech Stack

Tools were carefully selected to guarantee maximum performance, cost-efficiency, and seamless future scalability:

- **Framework:** Next.js 14+ (App Router) - Full-Stack Monorepo.
- **Backend Logic:** Server Actions & Route Handlers (Serverless Architecture).
- **Database:** MongoDB Atlas (Cloud Document Database).
- **ORM:** Mongoose / Prisma.
- **Styling & UI:** Tailwind CSS + Shadcn UI.
- **Cloud Storage:** Cloudinary / Uploadthing (Optimized `WebP` image handling and upload).
- **Deployment:** Vercel.

---

## 🎯 Core Features

### 1. The Seller Journey (User-Generated Content)
- **Seamless Listing Creation:** Easily submit properties detailing property type, price, exact address, price negotiability status, and contact info.
- **Image Optimization:** Support for up to 5 images per listing with automatic compression and resizing to maintain fast page loads.
- **Moderation Queue:** New listings are automatically set to `PENDING` and hidden from the public until reviewed by the admin.

### 2. The Buyer Journey (Smooth & Fast Browsing)
- **Verified Listings Only:** The homepage displays only approved (`APPROVED`) properties.
- **Advanced Filtering & Search:** Filter properties dynamically by type (Apartment/Villa), price range, and specific regions within Benisuef (e.g., Moqbel, Ard El-Horeya, El-Marmar, East of the Nile).
- **Direct Call-to-Action (CTA):** Sticky mobile buttons for instant phone calls or direct WhatsApp chats with the seller.

### 3. Admin Dashboard (Content Moderation)
- **Pending Requests:** Review incoming listings to either approve them (`Approve` status switches to `APPROVED` instantly) or reject/delete them (`Decline`).
- **Live Inventory Management:** Monitor all active listings and mark any property as "Sold" (`SOLD`) with a single click.
- **Sales Archive:** A dedicated archive view tracking successfully closed deals, which automatically filters them out from the public marketplace view.

---

## 🗺️ System Flowchart

### Property Lifecycle:
```text
[Seller: Add Property] ──► [DB: status = PENDING] ──► [Appears in Admin Dashboard]
                                                               │
                                       ┌───────────────────────┴───────────────────────┐
                                       ▼ (Declined)                                    ▼ (Approved)
                               [Permanently Deleted]                          [DB: status = APPROVED]
                                                                                       │
                                                                                       ▼
                                                                             [Live on Public Feed]
                                                                                       │
                                                                                       ▼ (When Sold)
                                                                              [DB: status = SOLD]
                                                                                       │
                                                                       ┌───────────────┴───────────────┐
                                                                       ▼                               ▼
                                                           [Hidden from Public View]       [Moved to Admin Archive]
