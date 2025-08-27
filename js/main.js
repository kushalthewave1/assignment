// Main JS for interactivity across pages
(function(){
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Highlight active nav link based on body[data-page]
  const page = document.body.getAttribute('data-page');
  document.querySelectorAll('[data-nav]').forEach(a=>{
    if(a.getAttribute('data-nav') === page){ a.classList.add('active'); }
  });

  // HTML page: Bootstrap validation example
  (function(){
    const form = document.querySelector('.needs-validation');
    if(!form) return;
    form.addEventListener('submit', e=>{
      if(!form.checkValidity()){
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  })();

  // JavaScript page demos
  const domBtn = document.getElementById('domBtn');
  if(domBtn){
    domBtn.addEventListener('click', ()=>{
      const p = document.getElementById('domText');
      p.textContent = 'Nice! You just changed the DOM using JavaScript.';
    });
  }

  const arr = [1,2,3,4,5,6];
  const arrBtn = document.getElementById('arrBtn');
  const arrMapBtn = document.getElementById('arrMapBtn');
  const arrDest = document.getElementById('arrDest');
  if(arrBtn && arrDest){
    arrBtn.addEventListener('click', ()=>{
      const evens = arr.filter(n=>n%2===0);
      arrDest.textContent = JSON.stringify(evens);
    });
  }
  if(arrMapBtn && arrDest){
    arrMapBtn.addEventListener('click', ()=>{
      const squared = arr.map(n=>n*n);
      arrDest.textContent = JSON.stringify(squared);
    });
  }

  // Mini Number Detector (simple version on JavaScript page)
  function isPrime(n){
    if(n<=1) return false;
    if(n<=3) return true;
    if(n%2===0 || n%3===0) return false;
    for(let i=5;i*i<=n;i+=6){
      if(n%i===0 || n%(i+2)===0) return false;
    }
    return true;
  }
  function isPalindrome(n){
    const s = String(Math.abs(n));
    return s === s.split('').reverse().join('');
  }
  const numInput = document.getElementById('numInput');
  const numResult = document.getElementById('numResult');
  function getNumber(){
    const v = Number(numInput.value);
    if(Number.isNaN(v)){ return null; }
    return v;
  }
  const evenBtn = document.getElementById('checkEvenOdd');
  const primeBtn = document.getElementById('checkPrime');
  const palBtn = document.getElementById('checkPalindrome');

  if(evenBtn && numResult){
    evenBtn.addEventListener('click', ()=>{
      const n = getNumber();
      if(n===null){ numResult.textContent = 'Enter a valid number'; return; }
      numResult.textContent = n % 2 === 0 ? 'Even' : 'Odd';
    });
  }
  if(primeBtn && numResult){
    primeBtn.addEventListener('click', ()=>{
      const n = getNumber();
      if(n===null){ numResult.textContent = 'Enter a valid number'; return; }
      numResult.textContent = isPrime(n) ? 'Prime' : 'Not prime';
    });
  }
  if(palBtn && numResult){
    palBtn.addEventListener('click', ()=>{
      const n = getNumber();
      if(n===null){ numResult.textContent = 'Enter a valid number'; return; }
      numResult.textContent = isPalindrome(n) ? 'Palindrome' : 'Not palindrome';
    });
  }

  // Full Number Detector Project page
  function factors(n){
    const f = [];
    const limit = Math.floor(Math.sqrt(n));
    for(let i=1;i<=limit;i++){
      if(n%i===0){ f.push(i); if(i!==n/i) f.push(n/i); }
    }
    return f.sort((a,b)=>a-b);
  }
  function signOf(n){
    return n>0?'Positive':(n<0?'Negative':'Zero');
  }

  const projectInput = document.getElementById('projectInput');
  const btnAll = document.getElementById('btnAllChecks');
  const btnClear = document.getElementById('btnClear');
  const btnExport = document.getElementById('btnExport');
  const resultsList = document.getElementById('resultsList');
  const historyBody = document.getElementById('historyBody');
  const history = [];

  function runAll(){
    const n = Number(projectInput.value);
    if(Number.isNaN(n) || !Number.isFinite(n)){
      alert('Please enter a valid integer.');
      return;
    }
    const item = {
      input: n,
      evenOdd: n%2===0 ? 'Even' : 'Odd',
      prime: isPrime(n),
      palindrome: isPalindrome(n),
      sign: signOf(n),
      factors: factors(Math.abs(n)),
      time: new Date().toLocaleString()
    };
    // Render results
    resultsList.innerHTML = '';
    const rows = [
      ['Even/Odd', item.evenOdd],
      ['Prime', item.prime ? 'Yes' : 'No'],
      ['Palindrome', item.palindrome ? 'Yes' : 'No'],
      ['Sign', item.sign],
      ['Factors', item.factors.join(', ') || '(none)']
    ];
    rows.forEach(([k,v])=>{
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between';
      li.innerHTML = `<strong>${k}</strong><span>${v}</span>`;
      resultsList.appendChild(li);
    });
    history.push(item);
    renderHistory();
  }

  function renderHistory(){
    if(!historyBody) return;
    historyBody.innerHTML = history.map((h,idx)=>{
      return `<tr>
        <td>${idx+1}</td>
        <td>${h.input}</td>
        <td>${h.evenOdd}</td>
        <td>${h.prime ? 'Yes':'No'}</td>
        <td>${h.palindrome ? 'Yes':'No'}</td>
        <td>${h.sign}</td>
        <td>${h.factors.join(', ')}</td>
        <td>${h.time}</td>
      </tr>`;
    }).join('');
  }

  if(btnAll){ btnAll.addEventListener('click', runAll); }
  if(btnClear){
    btnClear.addEventListener('click', ()=>{
      if(resultsList) resultsList.innerHTML = '';
      if(historyBody) historyBody.innerHTML = '';
      history.length = 0;
      if(projectInput) projectInput.value = '';
    });
  }
  if(btnExport){
    btnExport.addEventListener('click', ()=>{
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
      const a = document.createElement('a');
      a.setAttribute('href', dataStr);
      a.setAttribute('download', 'number-detector-history.json');
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }
})();
