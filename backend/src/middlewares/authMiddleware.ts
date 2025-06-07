// import { Request, Response, NextFunction } from "express";
// import verifyToken from "../utils/jwt";

// export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
//   try {
//     const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    
//     if (!token) {
//       res.status(401).json({
//         success: false,
//         message: "Access token required"
//       });
//       return;
//     }
//     console.log("first,",token)

//     const decoded = await verifyToken(token);
//     if (!decoded) {
//       res.status(401).json({
//         success: false,
//         message: "Invalid or expired token"
//       });
//       return;
//     }

//     // @ts-ignore - Adding user to request object
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "Invalid token"
//     });
//   }
// }
import { Request, Response, NextFunction } from "express";
import verifyToken from "../utils/jwt";

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    console.log("token",token)
    if (typeof token === "object" && "token" in token) {
      token = token.token;
    }

    if (!token || typeof token !== "string") {
       res.status(401).json({
        success: false,
        message: "Access token required"
      });
      return
    }

    console.log("Access Token:", token);

    const decoded = await verifyToken(token);
    if (!decoded) {
       res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
      return
    }
    console.log(decoded,"aaaaaaaaaaaaaa")

    // @ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
     res.status(401).json({
      success: false,
      message: "Invalid token"
    });
    return
  }
}



export function adminOnly(req: Request, res: Response, next: NextFunction): void {
  // @ts-ignore 
  const user = req.user;
  console.log("admin role check",user)

  if (!user || user.role !== "admin") {
    res.status(403).json({
      success: false,
      message: "Admin access only"
    });
    return;
  }

  next();
}
