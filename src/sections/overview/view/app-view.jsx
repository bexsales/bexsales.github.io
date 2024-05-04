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

  const [teamMetrics, setTeamMetrics] = useState({});

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
      setTeamMetrics(response.data.data);
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
            total={teamMetrics.weekly_total ? teamMetrics.weekly_total : '0'}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <AppWebsiteVisits
            title="Order Totals By Month"
            subheader=""
            chart={{
              labels: teamMetrics.totals_by_month ? Object.keys(teamMetrics.totals_by_month) : [
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
                  data: teamMetrics.totals_by_month ? Object.values(teamMetrics.totals_by_month) : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
              series: Object.entries(teamMetrics.top_customers).filter(([label, value]) => value !== 0).map(([label, value]) => ({ label, value })),
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

      </Grid>
    </Container>
  );
}
