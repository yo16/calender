/*! calender_main.js */

// 祝日定義
let MY_HOLIDAYS = [
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
    {'date': '2022/1/10', 'comment': '成人の日'},
    {'date': '2022/2/11', 'comment': '建国記念の日'},
    {'date': '2022/2/23', 'comment': '天皇誕生日'},
    {'date': '2022/3/21', 'comment': '春分の日'}
];

$(function(){
    // 祝日定義を書き換える
    edit_holidays_define();
    
    // カレンダー作成
    let cal = create_calender();
    $('body').append(cal);
});

// １ヶ月分のカレンダーを作成
// 引数の日付が含まれる月を表示
function create_calender(target_date = new Date()){
    //let yobi = ['日','月','火','水','木','金','土'];
    let yobi = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    // MY_HOLIDAYSから、当月のものだけをピックアップして、日だけからコメントを取り出せるようにする
    let cur_month_holydays = {};
    MY_HOLIDAYS.forEach(function(holy){
        if(
            holy['date'].getFullYear()==target_date.getFullYear() &&
            holy['date'].getMonth()==target_date.getMonth()
        ){
            cur_month_holydays[holy['date'].getDate()] = holy['comment'];
        }
    });

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
    // 1日
    let month_first_day = new Date(target_date.getFullYear(), target_date.getMonth(), 1);
    // 最終日(翌月の-1日)
    let month_last_day = new Date(target_date.getFullYear(), target_date.getMonth()+1, 0);
    // 1日の週の日曜日(getDay()==0)
    let cal_first_day = month_first_day;
    cal_first_day.setDate(cal_first_day.getDate()-cal_first_day.getDay());
    // 最終日の週の土曜日(getDay()==6)
    let cal_last_day = month_last_day;
    cal_last_day.setDate(cal_last_day.getDate()+(6-cal_last_day.getDay()));
    // 今日
    let today = new Date();
    // 描画
    let tr_days = null;
    for(let cur_day=cal_first_day, i=0;
        cur_day<=cal_last_day;
        cur_day.setDate(cur_day.getDate()+1), i++
    ){
        // trを作る
        if(i%7==0){
            tr_days = $('<tr></tr>');
        }

        // tdを作る
        let td = $('<td></td>')
            .addClass('day')
            .addClass('day_yobi_'+(i%7))
            .text(cur_day.getDate())
        ;
        if(
            cur_day.getFullYear()==today.getFullYear() &&
            cur_day.getMonth()==today.getMonth() &&
            cur_day.getDate()==today.getDate()
        ){
            td.addClass('today');
        }
        if(cur_day.getMonth() == target_date.getMonth()){
            // 今月
            // 祝日判定
            if(cur_day.getDate() in cur_month_holydays){
                td.addClass('day_holiday');
                td.append(
                    $('<span></span>')
                        .addClass('holiday_comment')
                        .text(cur_month_holydays[cur_day.getDate()])
                );
            }
        }else{
            // 先月 or 翌月
            td.addClass('another_month_day');
        }
        tr_days.append(td);

        // trをtableに入れる
        if(i%7==6){
            cal.append(tr_days);
        }
    }

    return cal;
}

function edit_holidays_define(){
    // MY_HOLIDAYSの日付をdt化
    for(let i=0; i<MY_HOLIDAYS.length; i++){
        MY_HOLIDAYS[i]['date'] = new Date(MY_HOLIDAYS[i]['date']);
    }

    // 日付が日曜日の場合は、翌日を振替休日にする
    let furikae = [];
    for(let i=0; i<MY_HOLIDAYS.length; i++){
        if(MY_HOLIDAYS[i]['date'].getDay()==0){
            let tmp = new Date(MY_HOLIDAYS[i]['date']);
            tmp.setDate(tmp.getDate()+1);
            furikae.push({'date': tmp, 'comment': '振替休日'});
        }
    }
    for(let i=0; i<furikae.length; i++){
        MY_HOLIDAYS.push(furikae[i]);
    }
}
