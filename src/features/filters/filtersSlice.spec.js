import { filterByStatus, filteredColors, filterByColors } from './filtersSlice'
import reducer from './filtersSlice'

describe("Test filter reducer", ()=>{
    it("Test filterByStatus", ()=>{
        expect(
            reducer({
                status: "all",
                colors: []
            }, filterByStatus('active'))
        ).toEqual({
            status: "active",
            colors: []
        })
    });
    it("Test filterByColors", ()=>{
        expect(
            reducer({
                status: "all",
                colors: []
            }, filterByColors(['red','blue']))
        ).toEqual({
            status: "all",
            colors: ['red','blue']
        })
    });
    it("Test filteredColors", ()=>{
        expect(
            reducer({
                colors: ['red','blue']
            }, filteredColors('red','uncheck' ))
        ).toEqual(
            ['blue']
        )
    });
    it("Test filteredColors", ()=>{
        expect(
            reducer({
                colors: ['red','blue']
            }, filteredColors('green','checked' ))
        ).toEqual(
            ['red','blue','green']
        )
    });
});