<template>
  <div>
    <canvas id="barChart" @click="handleChartClick($event, barChart)"></canvas>
    <button @click="updateChartData('bar', barChart)">
      棒グラフのデータを更新
    </button>

    <canvas id="stackedBarChart" @click="handleChartClick($event, stackedBarChart)"></canvas>
    <button @click="updateChartData('stackedBar', stackedBarChart)">
      積み上げグラフのデータを更新
    </button>
  </div>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from "vue";
  import {
    Chart,
    CategoryScale,
    BarController,
    BarElement,
    Title,
    Tooltip,
    LinearScale,
  } from "chart.js";
  // データ
  const chartData = ref({
    labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    datasets: [{
        label: "収入",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "支出",
        data: [12,11,10,9,8,7,6,5,4,3,2,1],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });
  // オプション
  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const stackedBarOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        stacked: true, // 積み上げを有効にする
      },
      x: {
        stacked: true, // 積み上げを有効にする
      },
    },
  };
  // チャートのインスタンス
  let barChart = null;
  let stackedBarChart = null;
  // ランダムなデータを生成する関数
  const generateRandomData = () => {
    const newData = [];
    for (let i = 0; i < 7; i++) {
      newData.push(Math.floor(Math.random() * 100) + 1);
    }
    return newData;
  };
  // 色の配列を生成する関数
  const generateRandomColors = (num) => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      colors.push(`rgba(${r}, ${g}, ${b}, 0.2)`);
    }
    return colors;
  };
  // チャートデータを更新する関数
  const updateChartData = (chartType, chart) => {
    if (chart) {
      if (chartType === "bar") {
        chart.data.datasets[0].data = generateRandomData();
        chart.data.datasets[0].backgroundColor = generateRandomColors(7);
        chart.data.datasets[0].borderColor = generateRandomColors(7).map(
          (color) => color.replace("0.2", "1")
        );
      } else if (chartType === "stackedBar") {
        chart.data.datasets.forEach((dataset) => {
          dataset.data = generateRandomData();
        });
      }
      chart.update();
    }
  };
  // チャートクリックイベントハンドラ
  const handleChartClick = (event, chart) => {
    const points = chart.getElementsAtEventForMode(
      event,
      "nearest", {
        intersect: true
      },
      false
    );
    if (points.length) {
      const firstPoint = points[0];
      const label = chart.data.labels[firstPoint.index];
      const value =
        chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
      console.log(`クリックしたバーのデータ: ${label}: ${value}`);
    }
  };
  onMounted(() => {
    Chart.register(
      CategoryScale,
      BarController,
      BarElement,
      Title,
      Tooltip,
      LinearScale
    );
    const barCanvas = document.getElementById("barChart");
    barChart = new Chart(barCanvas, {
      type: "bar",
      data: chartData.value,
      options: barOptions,
    });
    const stackedBarCanvas = document.getElementById("stackedBarChart");
    stackedBarChart = new Chart(stackedBarCanvas, {
      type: "bar",
      data: chartData.value,
      options: stackedBarOptions,
    });
  });
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }
</style>