function clock() {
   const clockSystem = new Date();
   let h = clockSystem.getHours();
   let m = clockSystem.getMinutes();
   let s = clockSystem.getSeconds();

   h = h<10 ? '0' + h : h;
   m = m<10 ? '0' + m : m;
   s = s<10 ? '0' + s : s;

   const time = h + ' : ' + m + ' : ' + s;
   document.getElementById('time').innerHTML = time;
}
setInterval(clock, 1000);
clock();
