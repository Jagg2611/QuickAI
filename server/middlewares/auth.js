import { clerkClient } from "@clerk/express";
// import { authenticateRequest } from "@clerk/express";


export const auth = async (req, res, next) => {
  console.log("✅ Inside auth middleware");

  try {
    const authData = await req.auth();
    console.log("authData:", authData);

    const { userId, has } = authData || {};

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Missing userId" });
    }

    const hasPremiumPlan = await has({ plan: "premium" });
    const user = await clerkClient.users.getUser(userId);

    // Default to 0 if free_usage is undefined
    const freeUsage = user.privateMetadata?.free_usage || 0;

    req.plan = hasPremiumPlan ? "premium" : "free";
    req.free_usage = freeUsage;
    req.userId = userId;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
