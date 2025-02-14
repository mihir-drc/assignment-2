// user-controller.ts
import prisma from "../utils/prisma";

export const addAccount = async (req: any, res: any) => {
  const {
    userId,
    accountNumber,
    bankName,
    accountType,
    balance,
    currency,
    ifsccode,
  } = req.body;
  console.log(userId);

  const bankAccount = await prisma.bankAccount.create({
    data: {
      userId: Number(userId),
      bankName,
      accountNumber,
      accountType,
      balance,
      currency,
      ifsccode,
    },
  });

  res.status(200).json({
    success: true,
    variant: "success",
    message: "Account Created SuccessFully!",
  });
};
export const fetchAccounts = async (req: any, res: any) => {
  const accounts = await prisma.bankAccount.findMany({
    where: { userId: Number(req.query.userId) },
  });
  res.status(200).json({ accounts, success: true });
};
export const fetchRecievers = async (req: any, res: any) => {
  const recievers = await prisma.user.findMany({
    where: { id: { not: Number(req.body.id) }, is_active: 1 },
    select: { fullName: true, id: true, profile: true },
  });
  res.status(200).json({ recievers, success: true });
};
export const fetchRecieverBankAccount = async (req: any, res: any) => {
  const bankAccount = await prisma.bankAccount.findUnique({
    where: { id: Number(req.body.bankAccountId) },
    select: { currency: true },
  });
  const recieversBank = await prisma.bankAccount.findMany({
    where: { userId: Number(req.body.id), currency: bankAccount?.currency },
    select: { accountNumber: true, bankName: true, id: true },
  });
  res.status(200).json({ recieversBank, success: true });
};
export const fetchCategories = async (req: any, res: any) => {
  const categories = await prisma.category.findMany({});
  res.status(200).json({ categories, success: true });
};
export const addTransaction = async (req: any, res: any) => {
  const {
    amount,
    bankAccountId,
    category,
    currency,
    description,
    recieverId,
    timePeriod,
    transactionDate,
    transactionType,
    userId,
    recieverAccountId,
  } = req.body;
  const userBankAccount = Number(bankAccountId);
  const transactionAmount = Number(amount);
  await prisma.bankAccount.update({
    where: { id: userBankAccount },
    data: {
      balance: { decrement: transactionAmount },
    },
  });
  let categoryId;
  const existCategory = await prisma.category.findFirst({
    where: { name: category },
  });
  if (existCategory) {
    categoryId = existCategory.id;
  } else {
    const newCategory = await prisma.category.create({
      data: {
        name: category,
      },
    });
    categoryId = newCategory.id;
  }
  if (transactionType == "TRANSFER") {
    await prisma.bankAccount.update({
      where: { id: Number(recieverAccountId) },
      data: {
        balance: { increment: transactionAmount },
      },
    });
  } else {
  }
  res.status(200);
};
