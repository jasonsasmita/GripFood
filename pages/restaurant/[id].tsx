import { Restaurant } from '@/functions/swagger/GripFoodBackEnd';
import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
import useSwr from 'swr';
import  {useRouter} from 'next/router';
import { Alert } from 'antd';
import { RestaurantDetailModel } from '@/source/repos/GripFood/functions/swagger/GripFoodBackEnd';
import Link from 'next/link';


const RestaurantDetailTableRow: React.FC<{
    menu: RestaurantDetailModel,
}> = ({ menu }) => {
    return (
        <tr>
            <td className="border px-4 py-2">{menu.name}</td>
            <td className="border px-4 py-2">{menu.price}</td>
        </tr>
    );
};

const IndexPage: Page = () => {
    const router = useRouter();
    const { id } = router.query;
    const swrFetcher = useSwrFetcherWithAccessToken();
    const menuDetailUri = id ? `/api/be/api/Restaurants/${id}` : undefined;
    const { data, error } = useSwr<Restaurant[]>(menuDetailUri , swrFetcher);
    return (
        <div>
            <Title>Grip Food</Title>
            <ul>
                <li>
                    <Link href='/'>Back to Restaurant List</Link>
                </li>
            </ul>
            <h2 className='mb-5 text-3xl'>Restaurant Menu</h2>
            {Boolean(error) && <Alert type='error' message='Cannot get Restaurant data' description={String(error)}></Alert>}
            <table className='table-auto mt-5'>
                <thead className='bg-slate-700 text-white'>
                    <tr>
                        <th className='px-4 py-2'>Name</th>
                        <th className='px-4 py-2'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((x, i) => <RestaurantDetailTableRow key={i} menu={x}></RestaurantDetailTableRow>)}
                </tbody>
            </table>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
