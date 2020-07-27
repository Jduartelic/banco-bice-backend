require("dotenv").config();
const fetch = require("node-fetch");
const config = require("../../config/");
const moment = require("moment");

const fetching = async (urlToBeFetched) => {
  const response = await fetch(urlToBeFetched);
  const json = await response.json();
  return json;
};

getFormatLabelChart = (historyData, valueArr) => {
  const date = Object.keys(historyData)[valueArr];
  const dateProcess = new Date(date * 1000);
  const finalDate = moment(dateProcess).format("YYYY-MM");
  return finalDate;
};

/**
 * @name getDetailsValues
 * @description
 *
 * API que entrega todos los valores de un elemento particular.
 **/
const getDetailsValues = async (body) => {
  const { key } = body;
  const url = config.API_URL + "/values/" + key;
  const json = await fetching(url);

  let responseData = {
    key: json.key,
    name: json.name,
    unit: json.unit,
    values: {},
    chartData: { prices: [], labelsChart: [], dataSetLabels: [] },
  };
  const historyData = json.values;
  const maxValue = Object.keys(historyData).length;

  await Object.keys(historyData).map((item, index) => {
    let labelDataSet = "";
    let val = 0;
    const date = new Date(item * 1000);
    const formattedDate = moment(date).format("DD/MM/YYYY");
    responseData.values = {
      ...responseData.values,
      [formattedDate]: historyData[item],
    };
    responseData.chartData.prices.push(historyData[item]);

    if (index === 1) {
      labelDataSet = getFormatLabelChart(historyData, 0);

      while (labelDataSet === "Invalid date") {
        labelDataSet = getFormatLabelChart(historyData, val);
        val++;
      }

      responseData.chartData.labelsChart.push(labelDataSet);
      responseData.chartData.dataSetLabels.push(labelDataSet);
    } else if (index === maxValue - 1) {
      labelDataSet = getFormatLabelChart(historyData, maxValue);

      while (labelDataSet === "Invalid date") {
        labelDataSet = getFormatLabelChart(historyData, maxValue - val);
        val++;
      }

      responseData.chartData.labelsChart.push(labelDataSet);
      responseData.chartData.dataSetLabels.push(labelDataSet);
    } else {
      responseData.chartData.labelsChart.push("");
    }
  });

  return responseData;
};

/**
 * @name getDetailsLast
 * @description
 *
 * API que entrega los últimos valores de todos los elementos.
 **/
const getDetailsLast = async () => {
  const url = config.API_URL + "/last";
  return fetching(url);
};

module.exports = {
  getDetailsValues,
  getDetailsLast,
};
