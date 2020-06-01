class RolePiChart
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


    let roles = {};


    for(let participation of this.summoner.getParticipations()) {
      let role = participation.getRole();
      let lane = participation.getLane();

      if(lane == 'JUNGLE') {
        role = 'JUNGLER';
        lane = '';
      }
      if(lane == 'NONE') {
        lane = 'RANDOM'
      }

      if(role == 'DUO_SUPPORT') {
        role = 'SUPPORT';
      }
      if(role == 'DUO_CARRY') {
        role = 'CARRY';
      }

      let caption =  role + ' ' + lane;
      caption = caption.substring(0,1).toUpperCase() + caption.substring(1).toLowerCase();
      if(typeof(roles[caption]) === 'undefined') {
        roles[caption] = 0;
      }
      roles[caption]++;
    }
    
    
    let captions = [];
    let values = [];
    for(let key in roles) {

      //let percent = Math.round((roles[key] / this.summoner.getParticipations().length) * 10000) /100;
      //let index = key + ' : ' + percent + '%';

      let index = key + ' : ' + roles[key];

      captions.push(index);
      values.push({value: roles[key], name: index});
    }


    let option = {
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
          orient: 'vertical',
          left: 10,
          data: captions
      },
      series: [
          {
              name: 'Role',
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
              data: values
          }
      ]
    };
    let graph = echarts.init(document.querySelector('.support-graph'));
    // use configuration item and data specified to show chart
    graph.setOption(option);
  }




}