import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

test('splits only the first separator, leaves plain bio alone and hides empty fields', () => {
  const rows = ['디자인팀 | UX 디자인을 담당합니다.', '소개만 있습니다.', '', '팀 | 소개 | 추가 내용', '팀 | ', ' | 소개'].map(text => {
    const bio={textContent:text,hidden:false};
    const team={textContent:'',hidden:true};
    return {bio,team,querySelector:s=>s==='[data-author-bio]'?bio:team};
  });
  runInNewContext(readFileSync('theme/assets/js/author-bio.js','utf8'),{document:{querySelectorAll:()=>rows}});
  assert.deepEqual(rows.map(r=>[r.team.textContent,r.team.hidden,r.bio.textContent,r.bio.hidden]),[
    ['디자인팀',false,'UX 디자인을 담당합니다.',false],
    ['',true,'소개만 있습니다.',false],['',true,'',true],
    ['팀',false,'소개 | 추가 내용',false],['팀',false,'',true],['',true,'소개',false]
  ]);
});
