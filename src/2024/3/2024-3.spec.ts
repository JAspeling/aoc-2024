import {fetchAoc, splitOnNewlines} from '../../utils/fetch-input';
import {executeMulInstruction, getInstructions, getAllDoIndexes, getAllDontIndexes, getDoSections, getLastDoSection, part1, part2, processInstructions, extractInstructions, getInitialSection} from './2024-3';
import { run } from './part.2';

const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const testInput2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
const day = 3;

describe('fetch 2024', () => {
  it(`should fetch day ${day} data`, async () => {
    const data = await fetchAoc(2024, day);

    expect(data).toBeTruthy();
    expect(localStorage.getItem(`2024-${day}`)).toBeTruthy();
  });
});

describe('part 1', () => {
  it('should calculate part 1', async () => {
    const realInput = await fetchAoc(2024, day);
    const result = await part1(realInput);
    // expect(result).toBe(x);
  });
});

describe('part 2 AGAIN', () => {
  it('should give me the right result now', async () => {
    const input = await fetchAoc(2024, day);
    expect(run(input)).toBe(123);
  })
})

describe('part 2', () => {
  it('should calculate part 2', async () => {
    const realInput = await fetchAoc(2024, day);
    const result = await part2(realInput);
    // expect(result).toBe(x);
  });
});

describe(`2024 day ${day}`, () => {
  it('should extract the valid expressions', () => {
    const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

    expect(extractInstructions(input)).toEqual( ['mul(2,4)', 'mul(5,5)', 'mul(11,8)', 'mul(8,5)']);
  })

  it('should perform the multiplication instruction', () => {
    const instruction = 'mul(2,4)';
    expect(executeMulInstruction(instruction)).toBe(8);
  });

  it('should get all the results of the instructions', () => {
    const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))don't()asdf`;
    const instructions = getInstructions(input);
    expect(processInstructions(instructions)).toBe(161);
  })

  // it('should find all the indexes of the execution blocks', () => {
  //   const result = executionBlocks(testInput2);

  //   expect(result).toBeTruthy();
  // })

  it ('should get all the valid execution blocks', () => {
    const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
    expect(getInstructions(input)).toEqual(['mul(2,4)', 'mul(8,5)']);
  })

  it(`should get all the indexes of don't() commands`, () => {
    const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))don't()?mul(8,5))`;
    expect(getAllDontIndexes(input)).toEqual([20, 73])
  })

  it(`should get all the indexes of do() commands`, () => {
    const input = `do()xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
    expect(getAllDoIndexes(input)).toEqual([0, 63]);
  });

  it(`should get all the sections between do() and don't()`, () => {
    const input = `do()xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))don't()?mul(8,5))`;
    expect(getDoSections(input)).toEqual([
      'xmul(2,4)&mul[3,7]!^',
      '?mul(8,5))',
    ]);
  })

  it.each([
    {
      val: `[mul(395,39)!,do()from()mul(345,451),mul(575,284):^+mul(210,669)@]&when()when()#mul(347,353) how()`,
      res: [
        'from()mul(345,451),mul(575,284):^+mul(210,669)@]&when()when()#mul(347,353) how()',
      ],
    },
    {
      val: `' mul(382,128)select(){*who(710,947)mul(117,325)?$#from()/select()mul(829,251)}@mul(17,183)(:*when()}?+,what()mul(911,142)[:>)who(824,820)/mul(199,484) when()mul(325,240))select()$~?'from(387,163)>what()@mul(920,723)where()}(#what()<who() !mul(274,899)what()mul(664,836)}~who();how()who(537,994)/(?]mul(257,635)^when()don't()!what()}where()#:when()>'where()mul(360,222),when()@&<^mul(268,245){{)%:from()<#mul(936,776)$select()!mul(474,825)how()}~mul(484,39)!?:@[*<mul(357,805)how()mul(261,810) {$>mul(306,422)$when()when()/@$$!mul(944,563)<!%!(from()mul(47,642)#^(why()(}:$mul(403,781)mul(382,778)$%$-)mul(48,400)@{?select()-/%when())}mul(114,537)^$&{&select()+why(){/mul(688,466) ):mul(950,333)when()}what()when(){>'!%+mul(974,802)what(291,78)*mul(394,250)why()<;mul(271,377)how()%**@who()*from()mul(569,753))who()*^mul(83,470)#-{from()when()-;mul(678,845)where()><;]$do()>what()(#)how() mul(958,48)`,
      res: [
        `>what()(#)how() mul(958,48)`,
      ],
    },
    {
      val: `[mul(395,39)!,do()from()mul(345,451)do(),mul(575,284):^do()+mul(210,669)@]&when()when()#mul(347,353) how()`,
      res: [
        'from()mul(345,451)',
        ',mul(575,284):^',
        '+mul(210,669)@]&when()when()#mul(347,353) how()',
      ],
    },
    {
      val: `[dont()mul(395,39)!,do()from()mul(345,451)do(),mul(575,284):^do()+mul(210,669)@]&when()don't()when()#mul(347,353) do()#mul(347,353)how()`,
      res: [
        'from()mul(345,451)',
        ',mul(575,284):^',
        '+mul(210,669)@]&when()',
        '#mul(347,353)how()',
      ],
    },
  ])('should get the correct do sections for # %#', ({ val, res }) => {
    expect(getDoSections(val)).toEqual(res);
  });

  it.each([
    {
      val: ` mul(382,128)select(){*who(710,947)mul(117,325)?$#from()/select()mul(829,251)}@mul(17,183)(:*when()}?+,what()mul(911,142)[:>)who(824,820)/mul(199,484) when()mul(325,240))select()$~?'from(387,163)>what()@mul(920,723)where()}(#what()<who() !mul(274,899)what()mul(664,836)}~who();how()who(537,994)/(?]mul(257,635)^when()don't()!what()}where()#:when()>'where()mul(360,222),when()@&<^mul(268,245){{)%:from()<#mul(936,776)$select()!mul(474,825)how()}~mul(484,39)!?:@[*<mul(357,805)how()mul(261,810) {$>mul(306,422)$when()when()/@$$!mul(944,563)<!%!(from()mul(47,642)#^(why()(}:$mul(403,781)mul(382,778)$%$-)mul(48,400)@{?select()-/%when())}mul(114,537)^$&{&select()+why(){/mul(688,466) ):mul(950,333)when()}what()when(){>'!%+mul(974,802)what(291,78)*mul(394,250)why()<;mul(271,377)how()%**@who()*from()mul(569,753))who()*^mul(83,470)#-{from()when()-;mul(678,845)where()><;]$do()>what()(#)how() mul(958,48)`,
      res: ` mul(382,128)select(){*who(710,947)mul(117,325)?$#from()/select()mul(829,251)}@mul(17,183)(:*when()}?+,what()mul(911,142)[:>)who(824,820)/mul(199,484) when()mul(325,240))select()$~?'from(387,163)>what()@mul(920,723)where()}(#what()<who() !mul(274,899)what()mul(664,836)}~who();how()who(537,994)/(?]mul(257,635)^when()`,
    },
    {
      val: ` mul(382,128)select(){*who(710,947)mul(117,325)?$#from()/select()mul(829,251)}@mul(17,183)(:*when()}?+,what()mul(911,142)[:>)who(824,820)/mul(199,484) when()mul(325,240))select()$~?'from(387,163)>what()@mul(920,723)where()}(#what()<who() !mul(274,899)what()mul(664,836)}~who();how()who(537,994)/(?]mul(257,635)^when()don't()!what()}where()#:when()>'where()mul(360,222)`,
      res: ` mul(382,128)select(){*who(710,947)mul(117,325)?$#from()/select()mul(829,251)}@mul(17,183)(:*when()}?+,what()mul(911,142)[:>)who(824,820)/mul(199,484) when()mul(325,240))select()$~?'from(387,163)>what()@mul(920,723)where()}(#what()<who() !mul(274,899)what()mul(664,836)}~who();how()who(537,994)/(?]mul(257,635)^when()`,
    },
    {
      val: `' mul(382,128)select(){*who(710,947)mul(117,325)?$#from()/select()mul(829,251)}@mul(17,183)(:*when()}?+,what()mul(911,142)[:>)who(824,820)/mul(199,484) when()mul(325,240))select()$~?'from(387,163)>what()@mul(920,723)where()}(#what()<who() !mul(274,899)what()mul(664,836)}~who();how()who(537,994)/(?]mul(257,635)^when()don't()!what()}where()#:when()>'where()mul(360,222),when()@&<^mul(268,245){{)%:from()<#mul(936,776)$select()!mul(474,825)how()}~mul(484,39)!?:@[*<mul(357,805)how()mul(261,810) {$>mul(306,422)$when()when()/@$$!mul(944,563)<!%!(from()mul(47,642)#^(why()(}:$mul(403,781)mul(382,778)$%$-)mul(48,400)@{?select()-/%when())}mul(114,537)^$&{&select()+why(){/mul(688,466) ):mul(950,333)when()}what()when(){>'!%+mul(974,802)what(291,78)*mul(394,250)why()<;mul(271,377)how()%**@who()*from()mul(569,753))who()*^mul(83,470)#-{from()when()-;mul(678,845)where()><;]$do()>what()(#)how() mul(958,48)select()from()<%mul(965,566)!};<where()mul(926,836)>*when()?)%do()}mul(465,920)>$%$when()mul(905,944)#$+~>mul(738,782)how()]&'{~from()-@-mul(671,73)#@'+when()(*mul(981,305)(],%~why()mul(943,403);*(& from()mul(773,597)from()?}who()mul(177,608); when(){'@how()how()$:mul(615,69)~>: ),(mul(273,327)&from()(!:mul(588,34)&);,~}&]where()how()mul(476,402)when(886,135)'what(435,192)/]]mul(70,477)how()[}*^mul(826,769)mul(630,778)]when(201,168)!mul(757,817)//$select()what()mul(704,71)why(274,220)(%<mul(880,91)'mul(482,52)what()?from(),mul(451,632)mul(744,609)^(!?from()]!/(+mul(851,817)&/~- ^ mul(879,78)(}?:what(){~what()]mul(955,80)don't()@)how()select()+ >:}}mul(11,257)mul(755,926)/mul(822,333)/;:;*(;!how()%mul(944,27)[,`,
      res: `' mul(382,128)select(){*who(710,947)mul(117,325)?$#from()/select()mul(829,251)}@mul(17,183)(:*when()}?+,what()mul(911,142)[:>)who(824,820)/mul(199,484) when()mul(325,240))select()$~?'from(387,163)>what()@mul(920,723)where()}(#what()<who() !mul(274,899)what()mul(664,836)}~who();how()who(537,994)/(?]mul(257,635)^when()`
    },
  ])('should match the initial section %', ({ val, res }) => {
    expect(getInitialSection(val)).toBe(res);
  });

  it(`should get the last section between do() and the endline terminator`, () => {
    const input = `do()xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
    expect(getLastDoSection(input)).toEqual('?mul(8,5))');
  });

  it(`should not get the last section if don't() is the last command`, () => {
    const input = `xmul(2,4)&mul[3,7]!^do()_mul(5,5)+mul(32,64](mul(11,8)undon't()?mul(8,5))`;
    expect(getLastDoSection(input)).toEqual('');
  });

})
