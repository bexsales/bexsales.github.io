import config from 'src/config/config'; // Adjust the import path as necessary

import axios from 'axios';
import Cookies from 'js-cookie';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppOrderTimeline from '../app-order-timeline';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import CreateOrderButton from '../create-order-button';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {

  const [weeklyTotal, setWeeklyTotal] = useState(0);

  const [totalsByMonth, setTotalsByMonth] = useState({});

  const [topCustomers, setTopCustomers] = useState({});

  const [latestOrders, setLatestOrders] = useState([]);


  useEffect(() => {
    fetchTeamMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTeamMetrics = () => {
    console.log('Fetching Team Metrics')
    const requestUrl = `${config.baseURL}/api-proxy/proxy?method=get&resource=teammetrics`
    console.log(requestUrl);
    axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`, // Replace with your actual JWT token
      }
    })
    .then(response => {
      console.log(response.data);
      setWeeklyTotal(response.data.data.weekly_total);
      setTotalsByMonth(response.data.data.totals_by_month);
      setTopCustomers(response.data.data.top_customers);
      setLatestOrders(response.data.data.latest_orders);
    })
    .catch(error => {
      console.error('Error fetching customers:', error);
    });
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={6}>
            <CreateOrderButton />
        </Grid>
        <Grid xs={12} sm={6} md={6}>
          <AppWidgetSummary
            title="Weekly Sales"
            total={weeklyTotal || '0'}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <AppWebsiteVisits
            title="Order Totals By Month"
            subheader=""
            chart={{
              labels: totalsByMonth ? Object.keys(totalsByMonth) : [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
                '12/01/2003',
              ],
              series: [
                {
                  name: '',
                  type: 'line',
                  fill: 'solid',
                  data: totalsByMonth ? Object.values(totalsByMonth) : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Total By Customer"
            subheader=""
            chart={{
              series: topCustomers ? Object.entries(topCustomers).filter(([label, value]) => value !== 0).map(([label, value]) => ({ label, value })): [
                { label: '', value: 0 },
                { label: '', value: 0 },
                { label: '', value: 0 },
                { label: '', value: 0 },
                { label: '', value: 0 },
                { label: '', value: 0 },
                { label: '', value: 0 },
                { label: '', value: 0 },
                { label: '', value: 0 },
                { label: '', value: 0 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Latest Confirmed Orders"
            list={latestOrders.map((order, index) => ({
              id: faker.string.uuid(),
              title: order.name,
              type: `order${index + 1}`,
              time: order.date_order,
            }))}
          />
        </Grid>

      </Grid>
    </Container>
  );
}
