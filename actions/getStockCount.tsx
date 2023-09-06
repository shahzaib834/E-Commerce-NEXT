import prismadb from '@/lib/prismadb';

const getStockCount = async (storeId: string) => {
  const stockCount = await prismadb.product.count({
    where: {
      storeId,
      isArchieved: false,
    },
  });

  return stockCount;
};

export default getStockCount;
