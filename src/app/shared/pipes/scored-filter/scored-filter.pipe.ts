import {Pipe, PipeTransform} from '@angular/core';
import {isArray, lowerCase, deburr, orderBy} from 'lodash';
import * as stringSimilarity from 'string-similarity';

@Pipe({
  name: 'scoredFilter'
})
export class ScoredFilterPipe implements PipeTransform {

  transform(original_arr: any[], strSearch: string, fieldSearch: string[] | string, qtdRetItem: number = 4, minRate: number = 0.3): any[] {
    if ((original_arr.length === 0) || (strSearch === '')) {
      return original_arr;
    }

    const fields: string[] = (isArray(fieldSearch) ? fieldSearch : [fieldSearch]) as string[];

    let ret = original_arr.filter(f =>
      fields.reduce(
        (bool, field) =>
          lowerCase(deburr(f[field])).indexOf(lowerCase(deburr(strSearch))) > -1 || bool, false)
    );

    if (ret.length > 0) {
      return ret;
    }

    ret = [];
    const bms = fields.reduce((arr, field) => {
      const arrOpt = original_arr.map(item => item[field]);
      return [...arr, stringSimilarity.findBestMatch(strSearch, arrOpt)];
    }, []);

    const ratings = bms.reduce((arr, bm) => [...arr, ...bm.ratings], []);
    const sortedBm = orderBy(ratings, ['rating'], ['desc']);

    for (let i = 0; i < qtdRetItem; i++) {
      if (sortedBm[i]) {
        const it = original_arr.filter(f =>
          fields.reduce((bool, field) =>
            (f[field] === sortedBm[i].target && sortedBm[i].rating > minRate) || bool,
            false));
        ret.push(...it);
      }
    }

    return ret;
  }

}
