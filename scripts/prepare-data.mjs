import fs from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve('public/data/interview-company-wise-problems-main')
const output = path.resolve('public/data/companies')
const manifestPath = path.resolve('public/data/manifest.json')
const csvParse = input => {
  const rows=[]; let row=[], cell='', quoted=false
  const text=input.replace(/^\uFEFF/,'')
  for(let i=0;i<text.length;i++){
    const c=text[i]
    if(quoted){if(c==='"'&&text[i+1]==='"'){cell+='"';i++}else if(c==='"')quoted=false;else cell+=c}
    else if(c==='"')quoted=true
    else if(c===','){row.push(cell);cell=''}
    else if(c==='\n'){row.push(cell);rows.push(row);row=[];cell=''}
    else if(c!=='\r')cell+=c
  }
  if(cell.length||row.length){row.push(cell);rows.push(row)}
  const [headers,...data]=rows
  return data.filter(r=>r.some(x=>x.trim())).map(values=>Object.fromEntries(headers.map((h,i)=>[h.trim(),(values[i]||'').trim()])))
}
const periodFor = filename => {
  const name=filename.toLowerCase()
  if(name.includes('thirty days')||name.includes('30 days'))return '30 Days'
  if(name.includes('three months'))return '3 Months'
  if(name.includes('six months')&&!name.includes('more than'))return '6 Months'
  if(name.includes('more than six months'))return 'More Than 6 Months'
  if(name.includes('all'))return 'All Time'
  return null
}
const safeName=name=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
await fs.mkdir(output,{recursive:true})
const manifest=[]
for(const entry of await fs.readdir(root,{withFileTypes:true})){
  if(!entry.isDirectory())continue
  const lists={}
  for(const filename of await fs.readdir(path.join(root,entry.name))){
    const period=periodFor(filename)
    if(!period||!filename.toLowerCase().endsWith('.csv'))continue
    const csv=await fs.readFile(path.join(root,entry.name,filename),'utf8')
    lists[period]=csvParse(csv).map(row=>({title:row.Title||row.title||row.Question||'',url:row.Link||row.link||row.URL||'',difficulty:row.Difficulty||row.difficulty||'',frequency:row.Frequency||row.frequency||''})).filter(q=>q.title)
  }
  if(!Object.keys(lists).length)continue
  const file=`companies/${safeName(entry.name)}.json`
  await fs.writeFile(path.join(output,`${safeName(entry.name)}.json`),JSON.stringify(lists))
  manifest.push({name:entry.name,file,count:Object.values(lists).reduce((sum,questions)=>sum+questions.length,0)})
}
manifest.sort((a,b)=>a.name.localeCompare(b.name))
await fs.writeFile(manifestPath,JSON.stringify(manifest))
console.log(`Prepared ${manifest.length} companies (${manifest.reduce((n,c)=>n+c.count,0)} question rows).`)
