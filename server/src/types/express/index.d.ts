// declare module "express-serve-static-core" {
//   interface Request {
//     user?: {
//       userId: number;
//       email: string;
//     };
//   }
// }

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
      };
    }
  }
}
