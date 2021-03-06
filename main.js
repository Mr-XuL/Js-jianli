let currentTime = new Date()
render(currentTime)

g('#today').onclick = ()=>{ 
   render(new Date())
}
g('#pMonth').onclick = ()=>{
   const  月初 = new Date(currentTime.getFullYear(),currentTime.getMonth(),1)
   render(new Date(月初 - 86400 * 1000 ))
}
g('#nMonth').onclick = ()=>{
   const  下月初 = new Date(currentTime.getFullYear(),currentTime.getMonth()+1,1)
   render (下月初)
}


//帮助函数

function g(selector) {
   return document.querySelector(selector)
}

function gs(selector) {
   return document.querySelectorAll(selector)
}

function render(time) {
   const year = currentTime.getFullYear()
   const month = currentTime.getMonth() + 1

   initTime()
   generateDays()
   currentTime=time

   function initTime() {
      const time = g('#time')
      time.textContent = `${year}年${month}月`
   }

   function generateDays() {
      const 月初 = new Date(year, month - 1, 1)
      const 月初星期几 = 月初.getDay()
      const 月末 = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000)
      const 月末几号 = 月末.getDate()
      const 月末星期几 = 月末.getDay()

      const 这个月多少天 = 月末几号
      const days = g('#days')
      days.innerHTML=""
      let n = 0

      const now = new Date()
      let selectedLi
      for (let i = 1; i <= 这个月多少天; i++) {
         const li = document.createElement('li')
         li.textContent = i
         if(i === now.getDate() && month === now.getMonth()+1 && year === now.getFullYear()){
            console.log(i);
            li.classList.add("calendar-days-todays")
         }
         li.onclick=()=>{
            if(selectedLi){selectedLi.classList.remove('calendar-days-selected')}
            li.classList.add("calendar-days-selected")
            selectedLi = li
         }
         
         days.append(li)
         n += 1
      }
      for (let i = 1; i < 月初星期几; i++) {
         const li = document.createElement('li')
         const d = new Date(月初 - 86400 * 1000 * i)
         li.textContent = d.getDate()
         li.onclick=()=>{
            if(selectedLi){selectedLi.classList.remove('calendar-days-selected')}
            li.classList.add("calendar-days-selected")
            selectedLi = li 
         }
         days.prepend(li) 
         li.classList.add('calendar-days-disable') 
         n+=1
      }

      
      let i = 月末星期几 + 1;
      for (let j =0; j <42-n; j++) {
         const delta = i - 月末星期几
         const li = document.createElement('li')
         const d = new Date(月末 - 0 + 86400 * 1000 * delta)
         li.textContent = d.getDate()
         li.onclick=()=>{
            if(selectedLi){selectedLi.classList.remove('calendar-days-selected')}
            li.classList.add("calendar-days-selected")
            selectedLi = li
         }
         days.append(li)
         li.classList.add('calendar-days-disable') 
         i++
      }
   }
}
