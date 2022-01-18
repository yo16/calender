/*! calender_main.js */

// 祝日定義
const MY_HOLIDAYS = [
    {'date': '2022/4/29', 'comment': '昭和の日'},
    {'date': '2022/5/3', 'comment': '憲法記念日'},
    {'date': '2022/5/4', 'comment': 'みどりの日'},
    {'date': '2022/5/5', 'comment': 'こどもの日'},
    {'date': '2022/7/18', 'comment': '海の日'},
    {'date': '2022/8/11', 'comment': '山の日'},
    {'date': '2022/9/19', 'comment': '敬老の日'},
    {'date': '2022/9/23', 'comment': '秋分の日'},
    {'date': '2022/10/10', 'comment': 'スポーツの日'},
    {'date': '2022/11/3', 'comment': '文化の日'},
    {'date': '2022/11/23', 'comment': '勤労感謝の日'},
    {'date': '2022/1/1', 'comment': '元旦'},
    {'date': '2022/1/2', 'comment': '振替休日'},
    {'date': '2022/1/9', 'comment': '成人の日'},
    {'date': '2022/2/11', 'comment': '建国記念の日'},
    {'date': '2022/2/23', 'comment': '天皇誕生日'},
    {'date': '2022/3/21', 'comment': '春分の日'}
];

$(function(){
    let cal = create_calender();
    $('body').append(cal);
});

// １ヶ月分のカレンダーを作成
// 引数の日付が含まれる月を表示
function create_calender(target_date = new Date()){
    //let yobi = ['日','月','火','水','木','金','土'];
    let yobi = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    // テーブル全体
    let cal = $('<table></table>')
        .addClass('calender_frame')
    ;
    
    // 月
    let str_month = (target_date.getMonth()+1) + '月';
    cal.append($('<tr></tr>')
        .append($('<td></td>')
            .addClass('month_name')
            .attr('colspan', '7')
            .text(str_month)
        )
    );

    // 曜日
    let tr_yobi = $('<tr></tr>');
    for(let i=0; i<7; i++){
        tr_yobi.append(
            $('<td></td>')
                .addClass('yobi_'+i)
                .addClass('yobi')
                .text(yobi[i])
        );
    }
    cal.append(tr_yobi);

    // 日
    // 今日
    let day_today = new Date();
    // 1日
    let day_first = new Date(day_today.getFullYear(), day_today.getMonth(), 1);
    // 最終日(翌月の-1日)
    let day_last = new Date(day_today.getFullYear(), day_today.getMonth()+1, 0);
    // 表示する日
    let day_cur = (new Date()).setDate(day_first.getDate() - 3);
    console.log(day_cur);

//    for()

    // 1日の前まで
    let tr_days = $('<tr></tr>');
    for(let i=0; i<day_first.getDay(); i++){
        tr_days.append(
            $('<td></td>')
                .addClass('day_empty')
        );
    }
    // １日～１週目
    for(let i=day_first.getDay(),j=1; i<7; i++,j++){
        tr_days.append(
            $('<td></td>')
                .addClass('day')
                .addClass('yobi_'+i)
                .text(j)
        );
    }
    cal.append(tr_days);

    // 




    
    

    return cal;
}