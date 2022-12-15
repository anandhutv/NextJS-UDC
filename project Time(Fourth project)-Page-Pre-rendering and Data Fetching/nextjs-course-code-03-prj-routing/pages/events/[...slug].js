//TODO: USING CLIENT SIDE DATA FETCHING
import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";

import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage() {
  const [loadedEvents,setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;

  const {data,error} = useSWR('https://nextjs-course-78651-default-rtdb.firebaseio.com/events.json');

  useEffect(()=>{
     if(data){
      const events =[];

      for (const key in data){
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
     }
  },[data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numMonth < 2021 ||
    numMonth < 1 ||
    numMonth > 12 || 
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event)=>{
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear && eventDate.getFullMonth() === numMonth - 1 
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;











//TODO: USING SERVER SIDE DATA RENDERING
// import { Fragment } from "react";
// import { useRouter } from "next/router";

// import { getFilteredEvents } from "../../helpers/api-util";
// import EventList from "../../components/events/event-list";
// import ResultsTitle from "../../components/events/results-title";
// import Button from "../../components/ui/button";
// import ErrorAlert from "../../components/ui/error-alert";

// function FilteredEventsPage(props) {
//   const router = useRouter();

//   const filterData = router.query.slug;

//   // if (!filterData) {
//   //   return <p className="center">Loading...</p>;
//   // }

//   // const filteredYear = filterData[0];
//   // const filteredMonth = filterData[1];

//   // const numYear = +filteredYear;
//   // const numMonth = +filteredMonth;

//   if (props.hasError) {
//     return (
//       <Fragment>
//         <ErrorAlert>
//           <p>Invalid filter. Please adjust your values!</p>
//         </ErrorAlert>
//         <div className="center">
//           <Button link="/events">Show All Events</Button>
//         </div>
//       </Fragment>
//     );
//   }

//   const filteredEvents = props.events

//   if (!filteredEvents || filteredEvents.length === 0) {
//     return (
//       <Fragment>
//         <ErrorAlert>
//           <p>No events found for the chosen filter!</p>
//         </ErrorAlert>
//         <div className="center">
//           <Button link="/events">Show All Events</Button>
//         </div>
//       </Fragment>
//     );
//   }

//   const date = new Date(props.date.year, props.date.month - 1);

//   return (
//     <Fragment>
//       <ResultsTitle date={date} />
//       <EventList items={filteredEvents} />
//     </Fragment>
//   );
// }



// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;

//   if (!filterData) {
//     return <p className="center">Loading...</p>;
//   }

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true }, // This means it will automatically forward to the user created error page
//       // notFound: true, //This means if don't have the page of this particular slug id show the 404 page
//       // redirect : {          //This means if don't have the page of this particular slug id show our error page
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth
//       }
//     },
//   };
// }

// export default FilteredEventsPage;
