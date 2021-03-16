function sleep(ms) {
    return new Promise(res => {
        setTimeout(res,ms);
    })
}

function sort(array) {
    if(array.length === 1) { return array }
    if(array.length === 2) {
        return array[0] < array[1] ?
        [array[0], array[1]] :
        [array[1], array[0]];
    }

    const length = array.length;
    const half = Math.floor(length / 2);
    const left = array.slice(0, half);
    const right = array.slice(half, length);

    const sortedLeft = sort(left);
    const sortedRight = sort(right);

    display([[...left, ...right]]);
    display([sortedLeft, sortedRight]);

    console.log(`%c${left}`, 'font-size: 16px; color: red');
    console.log(`%c${right}`, 'font-size: 16px; color: blue');
    console.log("%c------------------------------",'color: green');

    const [short, long] = sortedLeft.lenghth < sortedRight.length?
    [sortedLeft, sortedRight] :
    [sortedRight, sortedLeft];

    const merge = [];
    while(short.length > 0 || long.length > 0) {
        if(short.length === 0) {
            if(!isNaN(long[0])) { merge.push(long[0]) }
            long.shift();
        }
        if(long.length === 0) {
            if(!isNaN(short[0])) { merge.push(short[0]) }
            short.shift();
        }
        
        if(short[0] < long[0] && short.length > 0) {
            merge.push(short[0]);
            short.shift();
        } else if (long.length > 0) {
            merge.push(long[0]);
            long.shift();
        }
    }
    display([merge])
    separate();
    return merge;
}

const array2sort = [1,8,3,2,2,10,45,12,9,0,3,7];

(async () => {
    display([array2sort])
    
    const sortedArray = sort(array2sort);
    console.log(`%c${sortedArray}`, 'color: white; font-size: 20px; background: #1588ff; padding: 5px 10px;');
})();


// Displaying item in the wrapper

function display(array) {
    const row = document.createElement("div");
    row.className = "wrapper"

    document.body.appendChild(row);

    for(let subArray of array) {
        const subCell = document.createElement("div");
        subCell.className = "subCell";
        row.appendChild(subCell);

        for(let i in subArray) {
            const num = subArray[i];
    
            const elem = document.createElement("div");
            elem.className = "item";
            elem.innerText = num;
            elem.id = "i"+num;
    
            subCell.appendChild(elem);
        }
    }
}

function separate() {
    const elem = document.createElement("div");
    elem.className = "division";

    document.body.appendChild(elem);
}