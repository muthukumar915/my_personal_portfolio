(function() {
  // CURSOR
  var cursor = document.getElementById('cursor');
  var follower = document.getElementById('cursorFollower');
  var mx=0,my=0,fx=0,fy=0;
  document.addEventListener('mousemove', function(e){ mx=e.clientX; my=e.clientY; cursor.style.left=(mx-5)+'px'; cursor.style.top=(my-5)+'px'; });
  setInterval(function(){ fx+=(mx-fx)*.12; fy+=(my-fy)*.12; follower.style.left=(fx-18)+'px'; follower.style.top=(fy-18)+'px'; }, 16);
  document.querySelectorAll('a,button,.project-card,.seminar-card').forEach(function(el){
    el.addEventListener('mouseenter', function(){ cursor.style.transform='scale(2.5)'; });
    el.addEventListener('mouseleave', function(){ cursor.style.transform='scale(1)'; });
  });

  // TYPEWRITER
  var roles = ['Full Stack Developer','UI/UX Designer','Freelancer'];
  var ri=0, ci=0, del=false;
  var tw = document.getElementById('typewriter');
  function type(){
    var cur = roles[ri];
    if(!del){ tw.textContent = cur.slice(0,++ci); if(ci===cur.length){ del=true; setTimeout(type,1900); return; } }
    else { tw.textContent = cur.slice(0,--ci); if(ci===0){ del=false; ri=(ri+1)%roles.length; } }
    setTimeout(type, del?50:80);
  }
  type();

  // REVEAL ON SCROLL
  var reveals = document.querySelectorAll('.reveal');
  var revObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold:0.1});
  reveals.forEach(function(el){ revObs.observe(el); });

  // PROJECT FILTER
  document.querySelectorAll('.project-tab').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('.project-tab').forEach(function(b){ b.classList.remove('active'); });
      this.classList.add('active');
      var filter = this.dataset.filter;
      document.querySelectorAll('.project-card').forEach(function(card){
        var match = filter==='all' || card.dataset.type===filter;
        if(match){ card.style.display=''; setTimeout(function(){ card.style.opacity='1'; card.style.transform=''; },10); }
        else { card.style.opacity='0'; card.style.transform='scale(.95)'; setTimeout(function(){ card.style.display='none'; },300); }
      });
    });
  });

  // SCROLL TOP
  var stBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', function(){ stBtn.classList.toggle('visible', window.scrollY>400); });
  stBtn.addEventListener('click', function(){ window.scrollTo({top:0,behavior:'smooth'}); });

  // NAV HIGHLIGHT
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  window.addEventListener('scroll', function(){
    var cur='';
    sections.forEach(function(s){ if(window.scrollY>=s.offsetTop-120) cur=s.id; });
    navLinks.forEach(function(l){ l.style.color = l.getAttribute('href')==='#'+cur ? 'var(--text)' : ''; });
  });

  // COUNTER ANIMATION
  function animCount(el){
    var target=+el.dataset.count, step=target/112, val=0;
    var t=setInterval(function(){
      val=Math.min(val+step,target);
      el.textContent=Math.floor(val)+(target>10?'+':'');
      if(val>=target) clearInterval(t);
    },16);
  }
  var cObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.querySelectorAll('[data-count]').forEach(animCount); cObs.unobserve(e.target); }
    });
  },{threshold:.4});
  document.querySelectorAll('.seminar-stat-row').forEach(function(el){ cObs.observe(el); });

})();