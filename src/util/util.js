
const util = {
    arrayRemove(arr, el) {
        var res = [];
        arr.forEach((e) => {
            if (e !== el) {
                res.push(e);
            }
        });
        arr = null;
        return res;
    }
}

export default util;