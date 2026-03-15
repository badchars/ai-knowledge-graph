// D3.js Force-Directed Knowledge Graph
// Expects: window.__GRAPH_DATA = { terms, relationships, categories }
//          window.__UI_STRINGS
(function(){

document.addEventListener('DOMContentLoaded', function() {
  const data = window.__GRAPH_DATA;
  if (!data) return;

  const categories = data.categories;
  const lang = window.currentLang ? window.currentLang() : 'en';
  let W = window.innerWidth, H = window.innerHeight;

  // ── Legend ──
  const legendEl = document.getElementById('legend');
  const activeCats = new Set(Object.keys(categories));

  function buildLegend(lang) {
    if (!legendEl) return;
    legendEl.innerHTML = '';
    Object.entries(categories).forEach(function([k,c]) {
      const btn = document.createElement('button');
      btn.className = 'cat-chip' + (activeCats.has(k) ? '' : ' inactive');
      btn.dataset.cat = k;
      btn.innerHTML = '<span class="cat-dot" style="background:'+c.color+'"></span><span class="cat-label">'+c.label[lang]+'</span>';
      btn.onclick = function() {
        if (activeCats.has(k)) { activeCats.delete(k); btn.classList.add('inactive'); }
        else { activeCats.add(k); btn.classList.remove('inactive'); }
        filterGraph();
      };
      legendEl.appendChild(btn);
    });
  }
  buildLegend(lang);

  // ── SVG ──
  const svg = d3.select('#graph').append('svg').attr('width', W).attr('height', H);
  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  // No defs/gradients/filters — Snow uses plain fills

  const g = svg.append('g');

  // Zoom
  const zoomBehavior = d3.zoom().scaleExtent([.15,5]).on('zoom', function(e){ g.attr('transform',e.transform); });
  svg.call(zoomBehavior);

  // Data
  const nodes = data.terms.map(function(t){ return Object.assign({}, t); });
  const nodeMap = {};
  nodes.forEach(function(n){ nodeMap[n.id] = n; });
  const links = data.relationships.filter(function(r){ return nodeMap[r.source] && nodeMap[r.target]; }).map(function(r){ return Object.assign({}, r); });

  // Link counts for node sizing
  const linkCounts = {};
  links.forEach(function(l) {
    var s = typeof l.source === 'object' ? l.source.id : l.source;
    var t = typeof l.target === 'object' ? l.target.id : l.target;
    linkCounts[s] = (linkCounts[s]||0) + 1;
    linkCounts[t] = (linkCounts[t]||0) + 1;
  });
  function nodeRadius(d) { return Math.max(8, Math.min(20, 6 + (linkCounts[d.id]||0)*1.6)); }

  // Simulation — higher alphaDecay so it settles faster and stops ticking
  const sim = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(function(d){return d.id}).distance(110).strength(.35))
    .force('charge', d3.forceManyBody().strength(-450))
    .force('center', d3.forceCenter(W/2, H/2))
    .force('collision', d3.forceCollide().radius(35))
    .force('x', d3.forceX(W/2).strength(.025))
    .force('y', d3.forceY(H/2).strength(.025))
    .alphaDecay(.04);

  // Links — curved paths
  const linkG = g.append('g');
  const link = linkG.selectAll('path').data(links).join('path')
    .attr('fill','none')
    .attr('stroke', function(d){
      var src = typeof d.source==='object' ? d.source : nodeMap[d.source];
      var cat = src ? categories[src.category] : null;
      return cat ? cat.color+(isDark?'15':'20') : 'rgba(128,128,128,.08)';
    })
    .attr('stroke-width', 1.2)
    .attr('stroke-linecap','round')
    .attr('stroke-dasharray','3 8');

  // Link labels — created empty, text set only when needed (on hover/select)
  const linkLabel = linkG.selectAll('text').data(links).join('text')
    .attr('font-size','8px').attr('fill','var(--text2)').attr('opacity',0)
    .attr('text-anchor','middle').attr('dy',-5);

  // Nodes
  const node = g.append('g').selectAll('g').data(nodes).join('g')
    .style('cursor','pointer')
    .call(d3.drag().on('start',ds).on('drag',dd).on('end',de));

  // Node circle — low opacity fill
  node.append('circle')
    .attr('class','node-main')
    .attr('r', function(d){ return nodeRadius(d); })
    .attr('fill', function(d){ return categories[d.category].color+(isDark?'18':'12'); })
    .attr('stroke', function(d){ return categories[d.category].color+(isDark?'30':'25'); })
    .attr('stroke-width', 1);

  // Center dot
  node.append('circle')
    .attr('class','node-dot')
    .attr('r', function(d){ return Math.max(2.5, nodeRadius(d)*0.28); })
    .attr('fill', function(d){ return categories[d.category].color; })
    .attr('opacity', isDark ? .6 : .7);

  // Label
  node.append('text')
    .attr('dy', function(d){ return nodeRadius(d)+14; })
    .attr('text-anchor','middle')
    .attr('font-size','10px')
    .attr('font-weight','500')
    .attr('fill','var(--text2)')
    .text(function(d){ return d.name; });

  // Tooltip
  var tooltip = document.getElementById('tooltip');
  node.on('mouseover', function(e,d){
    var color = categories[d.category].color;
    d3.select(this).select('.node-main')
      .transition().duration(150)
      .attr('fill', color+(isDark?'30':'22'))
      .attr('stroke', color+(isDark?'55':'44'))
      .attr('stroke-width', 1.5)
      .attr('r', nodeRadius(d)+2);
    d3.select(this).select('.node-dot')
      .transition().duration(150)
      .attr('r', Math.max(3, nodeRadius(d)*0.35))
      .attr('opacity', 1);
    d3.select(this).select('text')
      .transition().duration(150)
      .attr('fill', color);
    var hcl = window.currentLang ? window.currentLang() : 'en';
    link.attr('stroke', function(l){ return (l.source.id===d.id||l.target.id===d.id) ? color+'55' : (isDark?'rgba(128,128,128,.03)':'rgba(128,128,128,.04)'); })
      .attr('stroke-width', function(l){ return (l.source.id===d.id||l.target.id===d.id) ? 1.8 : 1; });
    linkLabel.attr('opacity', function(l){ return (l.source.id===d.id||l.target.id===d.id) ? .8 : 0; })
      .text(function(l){ return (l.source.id===d.id||l.target.id===d.id) ? (l.label[hcl]||l.label.en) : ''; });
    if (tooltip) {
      var cl = window.currentLang ? window.currentLang() : 'en';
      tooltip.style.display = 'block';
      tooltip.innerHTML = '<div style="font-size:13px;font-weight:600;color:var(--text)">'+d.name+'</div>'
        +'<div style="font-size:11px;color:var(--text3)">'+d.fullName+'</div>'
        +'<div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.5px;color:'+color+';margin-top:3px">'+categories[d.category].label[cl]+'</div>';
    }
  })
  .on('mousemove', function(e){ if(tooltip){ tooltip.style.left=(e.pageX+14)+'px'; tooltip.style.top=(e.pageY-8)+'px'; }})
  .on('mouseout', function(e,d){
    d3.select(this).select('.node-main')
      .transition().duration(150)
      .attr('fill', categories[d.category].color+(isDark?'18':'12'))
      .attr('stroke', categories[d.category].color+(isDark?'30':'25'))
      .attr('stroke-width', 1)
      .attr('r', nodeRadius(d));
    d3.select(this).select('.node-dot')
      .transition().duration(150)
      .attr('r', Math.max(2.5, nodeRadius(d)*0.28))
      .attr('opacity', isDark ? .6 : .7);
    d3.select(this).select('text')
      .transition().duration(150)
      .attr('fill', 'var(--text2)');
    if (activeNode) { highlightNode(activeNode); }
    else { clearHighlight(); }
    if(tooltip) tooltip.style.display='none';
  })
  .on('click', function(e,d){ openPanel(d); });

  // Tick
  sim.on('tick', function(){
    link.attr('d', function(d){
      var mx=(d.source.x+d.target.x)/2, my=(d.source.y+d.target.y)/2;
      var dx=d.target.x-d.source.x, dy=d.target.y-d.source.y;
      var nx=-dy*0.15, ny=dx*0.15;
      return 'M'+d.source.x+','+d.source.y+' Q'+(mx+nx)+','+(my+ny)+' '+d.target.x+','+d.target.y;
    });
    linkLabel.attr('x', function(d){ return (d.source.x+d.target.x)/2; })
      .attr('y', function(d){ return (d.source.y+d.target.y)/2; });
    node.attr('transform', function(d){ return 'translate('+d.x+','+d.y+')'; });
  });

  function ds(e,d){ if(!e.active)sim.alphaTarget(.3).restart(); d.fx=d.x; d.fy=d.y; }
  function dd(e,d){ d.fx=e.x; d.fy=e.y; }
  function de(e,d){ if(!e.active)sim.alphaTarget(0); d.fx=null; d.fy=null; }

  // ── Active node highlight ──
  var activeNode = null;

  function highlightNode(d) {
    var color = categories[d.category].color;
    var cl = window.currentLang ? window.currentLang() : 'en';
    link.attr('stroke', function(l){
      return (l.source.id===d.id||l.target.id===d.id) ? color+'55' : (isDark?'rgba(128,128,128,.02)':'rgba(128,128,128,.03)');
    }).attr('stroke-width', function(l){
      return (l.source.id===d.id||l.target.id===d.id) ? 1.8 : 1;
    });
    linkLabel.attr('opacity', function(l){
      return (l.source.id===d.id||l.target.id===d.id) ? .8 : 0;
    }).text(function(l){
      return (l.source.id===d.id||l.target.id===d.id) ? (l.label[cl]||l.label.en) : '';
    });
    node.style('opacity', function(n){
      if (n.id===d.id) return 1;
      var connected = links.some(function(l){ return (l.source.id===d.id&&l.target.id===n.id)||(l.target.id===d.id&&l.source.id===n.id); });
      return connected ? .8 : .15;
    });
  }

  function clearHighlight() {
    link.attr('stroke', function(l){
      var src = categories[l.source.category];
      return src ? src.color+(isDark?'15':'20') : 'rgba(128,128,128,.08)';
    }).attr('stroke-width', 1.2);
    linkLabel.attr('opacity', 0).text('');
    node.style('opacity', 1);
  }

  // ── Panel ──
  var panel = document.getElementById('graph-panel');
  function openPanel(d) {
    if (!panel) return;
    panel.classList.add('open');
    activeNode = d;
    highlightNode(d);
    var cl = window.currentLang ? window.currentLang() : 'en';
    var ui = window.__UI_STRINGS ? window.__UI_STRINGS[cl] : {};
    var cat = categories[d.category];

    var badge = panel.querySelector('.cat-badge');
    if(badge){ badge.textContent=cat.label[cl]; badge.style.background=cat.color+'18'; badge.style.color=cat.color; badge.style.border='1px solid '+cat.color+'33'; }

    var nameEl = panel.querySelector('.panel-term-name');
    if(nameEl){ nameEl.textContent=d.name; nameEl.style.color=cat.color; }

    var fullEl = panel.querySelector('.panel-term-full');
    if(fullEl) fullEl.textContent = d.fullName;

    var descEl = panel.querySelector('.panel-term-desc');
    if(descEl) {
      var rawDesc = d.desc ? (d.desc[cl]||d.desc.en||'') : '';
      var parts = rawDesc.split(/\n\n+/);
      var html = parts.map(function(p) {
        var t = p.trim();
        if (!t) return '';
        t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:underline;text-underline-offset:2px">$1</a>');
        return '<p style="margin-bottom:8px">' + t + '</p>';
      }).join('');
      descEl.innerHTML = html;
    }

    var analogyEl = panel.querySelector('.panel-term-analogy');
    if(analogyEl) analogyEl.innerHTML = '<span class="analogy-icon">~</span>' + (d.analogy ? (d.analogy[cl]||d.analogy.en||'') : '');

    // View detail button — expand panel inline
    var detailBtn = panel.querySelector('.view-detail-btn');
    if(detailBtn) {
      detailBtn.textContent = (ui.viewDetail || 'Detail') + ' →';
      detailBtn.onclick = function(){ expandPanelDetail(d.id, cat); };
    }

    // Relations
    var relEl = panel.querySelector('.panel-relations');
    if(relEl) {
      var related = links.filter(function(l){ return l.source.id===d.id||l.target.id===d.id; });
      if(related.length > 0) {
        var html = '<div class="section-title">'+(ui.relations||'Relations')+'<span></span></div>';
        related.forEach(function(l){
          var other = l.source.id===d.id ? l.target : l.source;
          var oc = categories[other.category];
          var dir = l.source.id===d.id ? '→' : '←';
          html += '<div class="relation-item" data-id="'+other.id+'" style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text2);transition:all .15s"'
            +' onmouseover="this.style.background=\'var(--surface)\'" onmouseout="this.style.background=\'transparent\'">'
            +'<span class="relation-dot" style="width:6px;height:6px;border-radius:50%;background:'+oc.color+';flex-shrink:0"></span>'
            +'<span style="color:var(--text3);font-size:11px">'+dir+'</span>'
            +'<span style="font-weight:600;color:'+oc.color+'">'+other.name+'</span>'
            +'<span style="font-size:11px;color:var(--text3);margin-left:auto;font-style:italic">'+(l.label[cl]||l.label.en)+'</span>'
            +'</div>';
        });
        relEl.innerHTML = html;
        relEl.querySelectorAll('.relation-item').forEach(function(el){
          el.onclick = function(){
            var t = nodeMap[el.dataset.id];
            if(t){
              openPanel(t);
              var tr = d3.zoomTransform(svg.node());
              svg.transition().duration(600).call(zoomBehavior.transform,
                d3.zoomIdentity.translate(W/2-t.x*tr.k, H/2-t.y*tr.k).scale(tr.k));
            }
          };
        });
      } else {
        relEl.innerHTML = '';
      }
    }
  }

  function resetHighlight() {
    activeNode = null;
    clearHighlight();
  }
  var closeBtn = document.getElementById('panel-close');
  if(closeBtn) closeBtn.onclick = function(){ panel.classList.remove('open','expanded'); resetHighlight(); };
  var backBtn = document.getElementById('panel-back');
  if(backBtn) backBtn.onclick = function(){ collapsePanelDetail(); };

  // ── Spotlight Search ──
  var spotOverlay = document.getElementById('spotlight-overlay');
  var spotModal = document.getElementById('spotlight');
  var spotInput = document.getElementById('spotlight-input');
  var spotResults = document.getElementById('spotlight-results');
  var spotTrigger = document.getElementById('search-trigger');
  var spotActiveIdx = -1;

  function openSpotlight() {
    spotOverlay.classList.add('open');
    spotModal.classList.add('open');
    spotInput.value = '';
    spotResults.innerHTML = '';
    spotActiveIdx = -1;
    setTimeout(function(){ spotInput.focus(); }, 50);
    renderSpotlightResults('');
  }

  function closeSpotlight() {
    spotOverlay.classList.remove('open');
    spotModal.classList.remove('open');
    spotInput.blur();
    // Restore active node highlight or clear
    if (activeNode) { highlightNode(activeNode); } else { clearHighlight(); }
  }

  function renderSpotlightResults(q) {
    var cl = window.currentLang ? window.currentLang() : 'en';
    var results = [];
    if (!q) {
      // Show all terms sorted by name
      results = nodes.slice().sort(function(a,b){ return a.name.localeCompare(b.name); }).slice(0, 20);
    } else {
      var lower = q.toLowerCase();
      nodes.forEach(function(n){
        var score = 0;
        if (n.name.toLowerCase() === lower) score = 100;
        else if (n.name.toLowerCase().startsWith(lower)) score = 80;
        else if (n.name.toLowerCase().includes(lower)) score = 60;
        else if (n.fullName.toLowerCase().includes(lower)) score = 40;
        else if (n.id.includes(lower)) score = 20;
        if (score > 0) results.push({node: n, score: score});
      });
      results.sort(function(a,b){ return b.score - a.score; });
      results = results.map(function(r){ return r.node; });
    }

    if (results.length === 0) {
      spotResults.innerHTML = '<div class="spotlight-empty">No results</div>';
      return;
    }

    spotResults.innerHTML = results.map(function(n, i){
      var cat = categories[n.category];
      var catLabel = cat && cat.label ? (cat.label[cl]||cat.label.en) : n.category;
      return '<div class="spotlight-item'+(i===0?' active':'')+'" data-id="'+n.id+'" data-idx="'+i+'">' +
        '<span class="spotlight-item-dot" style="background:'+cat.color+';box-shadow:0 0 6px '+cat.color+'"></span>' +
        '<div class="spotlight-item-info"><div class="spotlight-item-name">'+n.name+'</div><div class="spotlight-item-full">'+n.fullName+'</div></div>' +
        '<span class="spotlight-item-cat">'+catLabel+'</span></div>';
    }).join('') + '<div class="spotlight-hint"><span><kbd>↑↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span><kbd>ESC</kbd> close</span></div>';

    spotActiveIdx = 0;

    // Click handlers
    spotResults.querySelectorAll('.spotlight-item').forEach(function(el){
      el.addEventListener('click', function(){
        selectSpotlightItem(el.dataset.id);
      });
    });
  }

  function updateSpotlightActive() {
    spotResults.querySelectorAll('.spotlight-item').forEach(function(el, i){
      el.classList.toggle('active', parseInt(el.dataset.idx) === spotActiveIdx);
    });
    var active = spotResults.querySelector('.spotlight-item.active');
    if (active) active.scrollIntoView({block:'nearest'});
  }

  function selectSpotlightItem(id) {
    closeSpotlight();
    var n = nodes.find(function(n){ return n.id === id; });
    if (n) {
      openPanel(n);
      // Zoom to node
      var scale = 1.5;
      svg.transition().duration(700).call(zoomBehavior.transform,
        d3.zoomIdentity.translate(W/2 - n.x*scale, H/2 - n.y*scale).scale(scale));
      // Highlight on graph
      var matches = new Set([id]);
      var conn = new Set();
      links.forEach(function(l){ if(matches.has(l.source.id))conn.add(l.target.id); if(matches.has(l.target.id))conn.add(l.source.id); });
      node.style('opacity', function(d){ return matches.has(d.id)?1:conn.has(d.id)?.5:.08; });
      link.style('opacity', function(l){ return (matches.has(l.source.id)||matches.has(l.target.id))?.6:.02; });
      linkLabel.style('opacity', function(l){ return (matches.has(l.source.id)||matches.has(l.target.id))?.6:.02; });
    }
  }

  if (spotInput) {
    spotInput.addEventListener('input', function(e){
      renderSpotlightResults(e.target.value.trim());
    });
    spotInput.addEventListener('keydown', function(e){
      var items = spotResults.querySelectorAll('.spotlight-item');
      if (e.key === 'ArrowDown') { e.preventDefault(); spotActiveIdx = Math.min(spotActiveIdx+1, items.length-1); updateSpotlightActive(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); spotActiveIdx = Math.max(spotActiveIdx-1, 0); updateSpotlightActive(); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        var active = spotResults.querySelector('.spotlight-item.active');
        if (active) selectSpotlightItem(active.dataset.id);
      }
    });
  }
  if (spotTrigger) spotTrigger.addEventListener('click', openSpotlight);
  if (spotOverlay) spotOverlay.addEventListener('click', closeSpotlight);

  // ── Category filter ──
  function filterGraph() {
    node.style('opacity', function(d){ return activeCats.has(d.category)?1:.04; })
      .style('pointer-events', function(d){ return activeCats.has(d.category)?'all':'none'; });
    link.style('opacity', function(l){ return activeCats.has(l.source.category)&&activeCats.has(l.target.category)?1:.02; });
    linkLabel.style('opacity', function(l){ return activeCats.has(l.source.category)&&activeCats.has(l.target.category)?1:.02; });
  }

  // ── Stats ──
  function updateStats() {
    var cl = window.currentLang ? window.currentLang() : 'en';
    var ui = window.__UI_STRINGS ? window.__UI_STRINGS[cl] : {};
    var statsEl = document.getElementById('stats');
    if(statsEl) {
      statsEl.innerHTML =
        '<span class="stat-pill">'+data.terms.length+' '+(ui.terms||'terms')+'</span>'+
        '<span class="stat-pill">'+data.relationships.length+' '+(ui.rels||'relations')+'</span>'+
        '<span class="stat-pill">'+(ui.hint||'Click · Drag · Zoom')+'</span>';
    }
  }
  updateStats();

  // ── Language change handler ──
  window.addEventListener('langchange', function(e) {
    var cl = e.detail.lang;
    buildLegend(cl);
    // Link label texts are set lazily on hover/select — no need to update all 531 here
    updateStats();
    if(panel && panel.classList.contains('open')) {
      var sel = nodes.find(function(n){ var ne=panel.querySelector('.panel-term-name'); return ne && ne.textContent===n.name; });
      if(sel) openPanel(sel);
    }
  });

  // ── Theme change handler ──
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.attributeName === 'data-theme') {
        isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        // Update node fills
        node.select('.node-main')
          .attr('fill', function(d){ return categories[d.category].color+(isDark?'18':'12'); })
          .attr('stroke', function(d){ return categories[d.category].color+(isDark?'30':'25'); });
        node.select('.node-dot')
          .attr('opacity', isDark ? .6 : .7);
        // Update links
        link.attr('stroke', function(d){
          var src = categories[d.source.category];
          return src ? src.color+(isDark?'15':'20') : 'rgba(128,128,128,.08)';
        });
      }
    });
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // ── Keyboard ──
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape'){
      if(spotModal && spotModal.classList.contains('open')) { closeSpotlight(); return; }
      if(panel && panel.classList.contains('expanded')) { collapsePanelDetail(); return; }
      if(panel) panel.classList.remove('open');
      resetHighlight();
    }
    if((e.key==='k' && (e.metaKey||e.ctrlKey)) || (e.key==='/' && document.activeElement.tagName!=='INPUT')){
      e.preventDefault();
      openSpotlight();
    }
  });

  // ── Resize handler ──
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      W = window.innerWidth;
      H = window.innerHeight;
      svg.attr('width', W).attr('height', H);
      sim.force('center', d3.forceCenter(W/2, H/2));
      sim.force('x', d3.forceX(W/2).strength(.025));
      sim.force('y', d3.forceY(H/2).strength(.025));
      sim.alpha(.3).restart();
    }, 150);
  });

  // ── Panel Detail Expansion ──
  var detailView = document.getElementById('panel-detail-view');

  // Build full term lookup from graph data (includes security/config/research/tips)
  var termFullMap = {};
  data.terms.forEach(function(t){ termFullMap[t.id] = t; });

  function expandPanelDetail(termId, cat) {
    if (!panel || !detailView) return;
    panel.classList.add('expanded');
    panel.scrollTop = 0;

    var term = termFullMap[termId];
    if (!term) return;

    // Build related terms list from relationships
    var related = [];
    data.relationships.forEach(function(r){
      var src = typeof r.source === 'object' ? r.source.id : r.source;
      var tgt = typeof r.target === 'object' ? r.target.id : r.target;
      if (src === termId && termFullMap[tgt]) {
        var o = termFullMap[tgt];
        related.push({ id:o.id, name:o.name, color:categories[o.category]?.color||'#888', relLabel:r.label });
      }
      if (tgt === termId && termFullMap[src]) {
        var o = termFullMap[src];
        related.push({ id:o.id, name:o.name, color:categories[o.category]?.color||'#888', relLabel:r.label });
      }
    });

    var termData = {
      id: term.id, name: term.name, fullName: term.fullName, category: term.category,
      desc: term.desc, analogy: term.analogy, security: term.security,
      config: term.config, research: term.research, tips: term.tips,
      _catLabel: cat?.label || categories[term.category]?.label || {},
      _catColor: cat?.color || categories[term.category]?.color || '#888',
      _related: related
    };

    renderDetailContent(termData);
  }

  function collapsePanelDetail() {
    if (!panel) return;
    panel.classList.remove('expanded');
    setTimeout(function(){ if(detailView) detailView.innerHTML = ''; }, 500);
  }

  function renderDetailContent(d) {
    if (!detailView) return;
    var cl = window.currentLang ? window.currentLang() : 'en';
    var ui = window.__UI_STRINGS ? window.__UI_STRINGS[cl] : {};
    var h = '';

    // Hero
    h += '<div style="margin-bottom:32px">';
    h += '<div class="cat-badge" style="background:'+(d._catColor||'#888')+'18;color:'+(d._catColor||'#888')+';border:1px solid '+(d._catColor||'#888')+'33;margin-bottom:10px">'
      +(d._catLabel?(d._catLabel[cl]||d._catLabel.en||''):'')+'</div>';
    h += '<div style="font-size:36px;font-weight:900;letter-spacing:-.5px;color:'+(d._catColor||'#888')+'">'+d.name+'</div>';
    h += '<div style="font-size:14px;color:var(--text3)">'+d.fullName+'</div>';
    h += '</div>';

    // Description
    var rawDesc = d.desc?(d.desc[cl]||d.desc.en||''):'';
    h += '<div class="term-section"><div class="section-title">'+(ui.desc||'Description')+'</div>';
    h += '<div class="section-content">'+textToP(rawDesc)+'</div></div>';

    // Analogy
    h += '<div class="term-section"><div class="section-title">'+(ui.analogy||'Analogy')+'</div>';
    h += '<div class="analogy-card"><span class="analogy-icon">~</span>'+(d.analogy?(d.analogy[cl]||d.analogy.en||''):'')+'</div></div>';

    // Security
    if (d.security && d.security.length) {
      h += '<div class="term-section"><div class="section-title">'+(ui.security||'Security')+'</div><div class="security-grid">';
      d.security.forEach(function(s){
        var sev=s.severity||'medium', title=s.title?(s.title[cl]||s.title.en||''):'', desc=s.description?(s.description[cl]||s.description.en||''):'';
        var sevL=ui.severity?(ui.severity[sev]||sev):sev;
        h+='<div class="security-card sev-'+sev+'"><div class="security-card-header"><span class="severity-badge severity-'+sev+'">'+sevL+'</span><span class="security-card-title">'+title+'</span></div><div class="security-card-desc">'+desc+'</div></div>';
      });
      h += '</div></div>';
    }

    // Config
    if (d.config && d.config.length) {
      h += '<div class="term-section"><div class="section-title">'+(ui.config||'Configuration')+'</div><div class="config-grid">';
      d.config.forEach(function(c){
        var desc=c.description?(c.description[cl]||c.description.en||''):'';
        h+='<div class="config-block"><div class="config-header"><span>'+c.title+'</span><span class="config-lang">'+(c.lang||'code')+'</span></div><pre class="config-code">'+escHtml(c.code)+'</pre>'+(desc?'<div class="config-desc">'+desc+'</div>':'')+'</div>';
      });
      h += '</div></div>';
    }

    // Research
    if (d.research && d.research.length) {
      h += '<div class="term-section"><div class="section-title">'+(ui.research||'Research & Sources')+'</div><div class="research-grid">';
      d.research.forEach(function(r){
        var tl=ui.researchType?(ui.researchType[r.type]||r.type):r.type;
        h+='<a class="research-item" href="'+r.url+'" target="_blank" rel="noopener"><span class="research-type">'+tl+'</span><div class="research-info"><div class="research-title">'+r.title+'</div><div class="research-meta">'+(r.year||'')+(r.authors?' · '+r.authors:'')+'</div></div><span class="research-arrow">→</span></a>';
      });
      h += '</div></div>';
    }

    // Tips
    if (d.tips && d.tips.length) {
      h += '<div class="term-section"><div class="section-title">'+(ui.tips||'Practical Tips')+'</div><div class="tips-list">';
      d.tips.forEach(function(t){
        var txt=typeof t==='string'?t:(t[cl]||t.en||'');
        h+='<div class="tip-item"><span class="tip-bullet"></span><span>'+txt+'</span></div>';
      });
      h += '</div></div>';
    }

    // Related terms
    if (d._related && d._related.length) {
      h += '<div class="term-section"><div class="section-title">'+(ui.relatedTerms||'Related Terms')+'</div><div class="related-grid">';
      d._related.forEach(function(r){
        h+='<a class="related-card" href="#" data-rel-id="'+r.id+'"><span class="related-dot" style="background:'+r.color+'"></span><span>'+r.name+'</span><span class="related-label">'+(r.relLabel?(r.relLabel[cl]||r.relLabel.en||''):'')+'</span></a>';
      });
      h += '</div></div>';
    }

    detailView.innerHTML = h;

    // Related card click → navigate to that term's detail
    detailView.querySelectorAll('.related-card').forEach(function(el){
      el.onclick = function(e){
        e.preventDefault();
        var rid = el.dataset.relId;
        var rn = nodeMap[rid];
        if (rn) {
          collapsePanelDetail();
          setTimeout(function(){
            openPanel(rn);
            var tr = d3.zoomTransform(svg.node());
            svg.transition().duration(600).call(zoomBehavior.transform,
              d3.zoomIdentity.translate(W/2-rn.x*tr.k, H/2-rn.y*tr.k).scale(tr.k));
          }, 550);
        }
      };
    });
  }

  function escHtml(s) {
    var el = document.createElement('div');
    el.textContent = s;
    return el.innerHTML;
  }

  function textToP(text) {
    if (!text) return '';
    var parts = text.split(/\n\n+/);
    return parts.map(function(p){
      var t = p.trim();
      if (!t) return '';
      t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:underline;text-underline-offset:2px">$1</a>');
      return '<p>'+t+'</p>';
    }).join('');
  }

  // Re-render detail on language change
  window.addEventListener('langchange', function(){
    if (panel && panel.classList.contains('expanded') && detailView.dataset.termId) {
      var cached = detailCache[detailView.dataset.termId];
      if (cached) renderDetailContent(cached);
    }
  });

  // Initial zoom
  svg.call(zoomBehavior.transform, d3.zoomIdentity.translate(W*.05, H*.05).scale(.85));
});

})();
