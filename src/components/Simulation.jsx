import React from 'react';
import { NumericFormat } from 'react-number-format';
import { useTranslation } from "react-i18next";

import { Box, Paper, Grid, Typography, Slider, Input, Container } from '@mui/material';
import { Euro as EuroIcon, Usd as UsdIcon } from '@mui/icons-material'; // Importing UsdIcon

import SimulationStore from "../stores/SimulationStore";
import InputElement from './InputElement';

export default function FiatPriceSimulation() {
  const minPrice = 5000;
  const maxPrice = 250000;

  const sats = SimulationStore((state) => state.sats);
  const oneFiatSats = SimulationStore((state) => state.oneFiatSats);
  const fiatPrice = SimulationStore((state) => state.fiatPrice);
  const sliderPrice = SimulationStore((state) => state.sliderPrice);
  const onInputChange = SimulationStore((state) => state.onInputChange);
  const onFiatPriceChange = SimulationStore((state) => state.onFiatPriceChange);
  const onSliderPriceChange = SimulationStore((state) => state.onSliderPriceChange);

  const handleBlur = () => {
    if (sliderPrice < minPrice) {
      onSliderPriceChange(null, minPrice);
    } else if (sliderPrice > maxPrice) {
      onSliderPriceChange(null, maxPrice);
    }
  };

  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Paper>
          <Box m={2} p={2} textAlign="center">
            <Typography variant="h6">{t("PriceSimulation")}</Typography>
            <Typography color="secondary" variant="h6">
              <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="inherit" mb={2}>
                <NumericFormat value={oneFiatSats}
                  displayType={'text'}
                  decimalScale={0}
                  fixedDecimalScale={true}
                  prefix={'1 € ≙ '}
                  suffix={' シ Satoshi'}
                  thousandSeparator={'.'}
                  decimalSeparator={','} />
              </Box >
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <UsdIcon /> {/* Replace EuroIcon with UsdIcon */}
              </Grid>
              <Grid item xs>
                <Slider
                  value={sliderPrice}
                  step={500}
                  min={minPrice}
                  max={maxPrice}
                  onChange={onSliderPriceChange}
                />
              </Grid>
              <Grid item>
                <Input
                  value={sliderPrice}
                  onChange={onInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 100,
                    min: minPrice,
                    max: maxPrice,
                    type: 'number',
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>

      <Container maxWidth="sm">
        <Paper>
          <Grid container justifyContent="center" alignItems="center" sx={{ p: 3 }}>
          <InputElement label="USD" endLabel="EUR" value={fiatPrice} onInputChange={onFiatPriceChange} />
            <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="inherit" sx={{ mx: 2, p: 1 }}>
              <Typography color="secondary" variant="h6">
                <NumericFormat
                  value={sats}
                  displayType={'text'}
                  decimalScale={0}
                  fixedDecimalScale={true}
                  suffix={' シ Satoshi'}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                />
              </Typography>
            </Box >
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
