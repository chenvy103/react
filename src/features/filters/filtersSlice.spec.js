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
    it("Test filterByColors1", ()=>{
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
    it("Test filteredColors2", ()=>{
        expect(
            reducer({
                colors: ['red','blue']
            }, filteredColors('red','uncheck' ))
        ).toEqual(
            {colors: ['blue']}
        )
    });
    it("Test filteredColors3", ()=>{
        expect(
            reducer({
                colors: ['red','blue']
            }, filteredColors('green','checked' ))
        ).toEqual(
            {colors: ['red','blue','green']}
        )
    });
});