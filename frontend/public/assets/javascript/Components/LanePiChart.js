class LanePiChart
{
  summoner = null;
  lanes = {
    MID: 0,
    NONE: 0,
    TOP: 0,
    BOTTOM: 0,
    JUNGLE: 0
  };

  constructor(summoner) {
    this.summoner = summoner;
  }

  render() {

    for(let participation of this.summoner.getParticipations()) {
      this.lanes[participation.getLane()]++;
    }

    let option = {
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
          orient: 'vertical',
          left: 10,
          data: ['Mid', 'Top', 'Bot', 'Jungle', 'Random']
      },
      series: [
          {
              name: 'Lane',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  label: {
                      show: true,
                      fontSize: '30',
                      fontWeight: 'bold'
                  }
              },
              labelLine: {
                  show: false
              },
              data: [
                  {value: this.lanes.MID, name: 'Mid'},
                  {value: this.lanes.TOP, name: 'Top'},
                  {value: this.lanes.BOTTOM, name: 'Bot'},
                  {value: this.lanes.JUNGLE, name: 'Jungle'},
                  {value: this.lanes.NONE, name: 'Random'}
              ]
          }
      ]
    };
    let graph = echarts.init(document.querySelector('.lane-graph'));
    // use configuration item and data specified to show chart
    graph.setOption(option);
  }




}