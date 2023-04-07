import express from "express";
import * as ad from "../controllers/ad.js";
import { requireSignIn } from "../middlewares/auth.js";

const router = express.Router();

router.post("/upload-image", requireSignIn, ad.uploadImage);
router.post("/remove-image", requireSignIn, ad.removeImage);
router.post("/ad", requireSignIn, ad.create);
router.get("/ads", ad.ads);
router.get("/ad/:slug", ad.read);

router.post("/wishlist", requireSignIn, ad.addToWishlist);
router.delete("/wishlist/:adId", requireSignIn, ad.removeFromWishlist);

router.post("/contact-seller", requireSignIn, ad.contactSeller);

router.get("/user-ads/:page", requireSignIn, ad.userAds);
router.put("/ad/:_id", requireSignIn, ad.update);
router.delete("/ad/:_id", requireSignIn, ad.remove);
router.get("/enquiries", requireSignIn, ad.enquiriedProperties);
router.get("/wishlist", requireSignIn, ad.wishlist);

router.get("/ads-for-sell", ad.adsForSell);
router.get("/ads-for-rent", ad.adsForRent);
router.get("/search", ad.search);

export default router;
