'use client';

import { Plus } from 'lucide-react';
import Heading from '../../../../../../components/ui/Heading';
import { Button } from '../../../../../../components/ui/button';
import { Separator } from '../../../../../../components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { ProductColumn, columns } from './Columns';
import { DataTable } from '@/components/ui/DataTable';
import ApiList from '@/components/ui/ApiList';

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Products (${data.length})`}
          description='Manage Products for your store'
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='name' />
      <Heading title='API' description='API calls for Products' />
      <Separator />
      <ApiList entityName='products' entityIdName='productId' />
    </>
  );
};

export default ProductClient;
