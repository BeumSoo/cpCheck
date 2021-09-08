
export function capture_browser(){
    const capt_area = document.getElementById('wrap_result').getElementsByClassName('flexBox')[0];
    html2canvas(capt_area)
    .then(canvas =>{
        const url = document.createElement('A');
        url.href = canvas.toDataURL('image/png');
        open_browser(url);
    });
}//capture_browser

function open_browser(url){
    const win = window.open('');
    win.document.write(
        `<html>
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>이미지 저장 :: 💞 CP checklist </title>
            </head>
            <body>`);
    win.document.write(
        `<a href="${url}" download>
            <img src="${url}" alt="으악 canvas 미지원 브라우저는 엑박!!!"/>
        </a>`);
    win.document.write('</body></html>')
}//open_browser