import { Restaurant } from '@/functions/swagger/GripFoodBackEnd';
import { WithDefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { Page } from '../types/Page';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
import useSwr from 'swr';
import { Alert } from 'antd';
import Link from 'next/link';


const RestaurantTableRow: React.FC<{
    restaurant: Restaurant,
}> = ({ restaurant }) => {
    return (
        <tr>
            <td className="border px-4 py-2">
                <Link href={`/restaurant/${restaurant.id}`}>{restaurant.name}</Link>
            </td>
        </tr>
    );
};

const IndexPage: Page = () => {

    const swrFetcher = useSwrFetcherWithAccessToken();
    const { data, error } = useSwr<Restaurant[]>('/api/be/api/Restaurants', swrFetcher);
    return (
        <div>
            <Title>Grip Food</Title>
            <h2 className='mb-5 text-3xl'>Restaurant</h2>
            {Boolean(error) && <Alert type='error' message='Cannot get Restaurant data' description={String(error)}></Alert>}
            <table className='table-auto mt-5'>
                <thead className='bg-slate-700 text-white'>
                    <tr>
                        <th className='px-4 py-2'>Restaurant</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((x, i) => <RestaurantTableRow key={i} restaurant={x}></RestaurantTableRow>)}
                </tbody>
            </table>
        </div>
    );
}



IndexPage.layout = WithDefaultLayout;
export default IndexPage;
