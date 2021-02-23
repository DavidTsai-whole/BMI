const h2 = document.querySelector('.h2')
const height = document.querySelector('#height')
const weight = document.querySelector('#weight')
const submitP = document.querySelector('.submitP')
const bmilist = document.querySelector('.bmiList')
const button = document.querySelector('.button')
const warnH = document.querySelector('.warnH')
const warnW = document.querySelector('.warnW')
let bmidata = JSON.parse(localStorage.getItem('listData')) || []
appearData(bmidata)




function choose(e) {
   if (e.target.nodeName === 'INPUT' && (height.value !== '' && weight.value !== ''))
      displayData();
   else if (e.target.nodeName === 'INPUT' && (height.value === '' && weight.value === '')) {
      warnH.textContent = '請輸入身高'
      warnW.textContent = '請輸入體重'
   }
   else if (e.target.nodeName === 'INPUT' && (height.value !== '' && weight.value === ''))
      warnW.textContent = '請輸入體重'
   else if (e.target.nodeName === 'INPUT' && (height.value === '' && weight.value !== ''))
      warnH.textContent = '請輸入身高'
   else if (e.target.nodeName === 'A' || e.target.nodeName === 'IMG')
      reset();
}

function displayData(e) {
   let hei = parseInt(height.value);
   let wei = parseInt(weight.value);
   let bmi = (wei / (hei * hei) * (10000)).toFixed(1);
   let color = ''
   let status = ''
   if (bmi <= 18.5) {
      status = '過輕'
      color = '#31baf9'
   } else if (18.5 < bmi && bmi <= 25) {
      status = '理想'
      color = '#86d73f'
   } else if (25 < bmi && bmi <= 30) {
      status = '過重'
      color = '#ff982d'
   } else if (30 < bmi && bmi <= 35) {
      status = '輕肥'
      color = '#ff6c03'
   } else if (35 < bmi && bmi <= 40) {
      status = '中肥'
      color = '#D26900'
   } else {
      status = '重肥'
      color = '#ff1200'
   }
   //時間
   let today = new Date();
   let currentDate = `${today.getFullYear()}/${(today.getMonth()) + 1}/${today.getDate()}`;

   const BMIdata = {
      BMI: bmi,
      Status: status,
      height: hei,
      weight: wei,
      Currendate: currentDate,
      Color: color
   }

   bmidata.push(BMIdata)
   appearData(bmidata)
   localStorage.setItem('listData', JSON.stringify(bmidata))

   let str = `<div class="result" 
 style="background:#424242;color:${BMIdata.Color};border:6px solid ${BMIdata.Color}">
 <h3 style="font-size:30px">BMI</h3>
 <p style="font-size:20px">${BMIdata.BMI}</p>
 <p style="font-size:10px">(${BMIdata.Status})</p>
 <a class="f5" style="background:${BMIdata.Color};border:3px solid #424242"><img  src="https://i.imgur.com/hcVn9ZN.png"></a>
 </div>`
   submitP.innerHTML = str;

}

function reset(e) {
   document.querySelector('.form').reset();
   submitP.innerHTML = `<input type="submit" value="計算" class="submit">`
}

function appearData(data) {
   let str = '';
   for (let i = 0; i < data.length; i++) {
      str += ` <li data-num="${i}" style="border-left:6px solid ${data[i].Color}"><span style="font-weight:bold">${data[i].Status}</span>
      <span>(Bmi)&nbsp${data[i].BMI}</span>
      <span>(Height)&nbsp${data[i].height}cm</span>
      <span>(Weight)&nbsp${data[i].weight}kg</span>
      <span>${data[i].Currendate}</span>
      <i class="fas fa-trash-alt fa-2x "></i>
      </li>`
   }
   if (data.length >= 2) {
      button.setAttribute('style', 'display:block;margin-left:50%;transform:translateX(-50%)')
   } else if (data.length <= 1) {
      button.setAttribute('style', 'display:none')
   }
   bmilist.innerHTML = str
}

function deletee(e) {
   if (e.target.nodeName !== 'I') {
      return
   }
   let num = e.target.closest('li').dataset.num;
   bmidata.splice(num, 1)
   localStorage.setItem('listData', JSON.stringify(bmidata))
   appearData(bmidata)


}

function allDelete(e) {
   localStorage.removeItem('listData')
   bmidata = [];
   appearData(bmidata)

}

function warnHe(e) {
   if (e.target.value === '')
      warnH.textContent = '請輸入身高'
   else
      warnH.textContent = ''
}
function warnWe(e) {
   if (e.target.value === '')
      warnW.textContent = '請輸入體重'
   else
      warnW.textContent = ''
}

button.addEventListener('click', allDelete)
bmilist.addEventListener('click', deletee)
submitP.addEventListener('click', choose)
height.addEventListener('blur', warnHe)
weight.addEventListener('blur', warnWe)
