export const orderBy = (array, propName) => array.sort((a, b) => {
        if (a[propName] < b[propName]) {
            return -1;
        } else if (a[propName] > b[propName]) {
            return 1;
        }

        return 0;
    });
