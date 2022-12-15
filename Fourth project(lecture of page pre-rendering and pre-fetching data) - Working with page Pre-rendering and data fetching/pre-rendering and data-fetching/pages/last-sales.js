import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalespage = (props) => {
  const [sales, setSales] = useState(props.sales);

  const { data, error } = useSWR(
    "https://nextjs-course-78651-default-rtdb.firebaseio.com/sales.json"
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);
  // const [isLoading,setIsLaoding] = useState(false)

  // useEffect(()=>{
  //   setIsLaoding(true);
  //   fetch('https://nextjs-course-78651-default-rtdb.firebaseio.com/sales.json').then((response)=>response.json())
  //   .then(data=>{
  //     const transformedSales = [];

  //     for(const key in data){
  //       transformedSales.push({
  //         id: key,
  //         username: data[key].username,
  //         volume: data[key].volume
  //       });
  //     }
  //     setSales(transformedSales)
  //     setIsLaoding(false)
  //   })
  // })

  // if(isLoading){
  //   return <p>Loading...</p>
  // }

  if (error) {
    return <p>Failed to Load...</p>;
  }

  if (!data && !sales) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            {sale.username} - ${sale.volume}
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-78651-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { props: { sales: transformedSales } };
}

export default LastSalespage;
