
const size=55;
let arr = [];
const container = document.querySelector('#container');
init();

function init() {
    for (let i = 0; i < size; i++) {
        arr[i] = Math.random();
    }
    showbars();
}


function updateDetails(sortType) {
    const nameElement = document.getElementById('name');
    const bestElement = document.getElementById('best');
    const averageElement = document.getElementById('average');
    const wrostElement = document.getElementById('Wrost');
    const stableElement = document.getElementById('stable');

    switch (sortType) {
        case 'bubble':
            nameElement.textContent = 'Bubble Sort';
            bestElement.textContent = 'O(n)';
            averageElement.textContent = 'O(n^2)';
            wrostElement.textContent = 'O(n^2)';
            stableElement.textContent = 'Yes';
            break;
        case 'insertion':
            nameElement.textContent = 'Insertion Sort';
            bestElement.textContent = 'O(n)';
            averageElement.textContent = 'O(n^2)';
            wrostElement.textContent = 'O(n^2)';
            stableElement.textContent = 'Yes';
            break;
        case 'selection':
            nameElement.textContent = 'Selection Sort';
            bestElement.textContent = 'O(n^2)';
            averageElement.textContent = 'O(n^2)';
            wrostElement.textContent = 'O(n^2)';
            stableElement.textContent = 'No';
            break;
        case 'heap':
            nameElement.textContent = 'Heap Sort';
            bestElement.textContent = 'O(n log n)';
            averageElement.textContent = 'O(n log n)';
            wrostElement.textContent = 'O(n log n)';
            stableElement.textContent = 'No';
            break;
        case 'quick':
            nameElement.textContent = 'Quick Sort';
            bestElement.textContent = 'O(n log n)';
            averageElement.textContent = 'O(n log n)';
            wrostElement.textContent = 'O(n^2)';
            stableElement.textContent = 'No';
            break;
        default:
            nameElement.textContent = '';
            bestElement.textContent = '';
            averageElement.textContent = '';
            wrostElement.textContent = '';
            stableElement.textContent = '';
            break;
    }
}





function play() {
    const sortType = document.getElementById('sortType').value;
    updateDetails(sortType);

    const copy = [...arr];
    let swaps;

    switch (sortType) {
        case 'bubble':
            swaps = bubbleSort(copy);
            break;
        case 'insertion':
            swaps = insertionSort(copy);
            break;
        case 'selection':
            swaps = selectionSort(copy);
            break;
        case 'heap':
            swaps = heapSort(copy);
            break;
        case 'quick':
            swaps = quickSort(copy);
            break;
        default:
            return; // No valid sort type selected
    }

    animate(swaps);
}


function animate(swaps) {
    if (swaps.length === 0) {
        showbars([]); // Mark the entire array as sorted when finished
        return;
    }
    const [i, j] = swaps.shift();
    [arr[i], arr[j]] = [arr[j], arr[i]];
    showbars([i, j]); // Adjust sorted portion
    setTimeout(() => {
        animate(swaps);
    }, 20); // Increased delay for better visibility
}



// Function to display the array as bars
function showbars(indices) {
    if (!container) {
        container = document.getElementById('container'); // Ensure container is initialized
    }
    container.innerHTML = "";
    for (let i = 0; i < size; i++) {
        const bar = document.createElement("div");
        bar.style.height = arr[i] * 100 + "%";
        bar.style.width = "20px";
        bar.style.margin = "1px";
        
        if (indices && indices.includes(i)) {
            bar.style.backgroundColor = "red"; // Highlight currently swapped elements
        } 
        else {
            bar.style.backgroundColor = "black"; // Unsorted part
        }

        container.appendChild(bar);
    }
}


// Bubble Sort
function bubbleSort(arr) {
    const swaps = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swaps.push([j, j + 1]);
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return swaps;
}

// Insertion Sort
function insertionSort(arr) {
    const swaps = [];
    for (let i = 1; i < size; i++) {
        let j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            swaps.push([j - 1, j]);
            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
            j--;
        }
    }
    return swaps;
}

// Selection Sort
function selectionSort(arr) {
    const swaps = [];
    for (let i = 0; i < size; i++) {
        let minIndex = i;
        for (let j = i + 1; j < size; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            swaps.push([i, minIndex]);
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return swaps;
}


// Heap Sort
function heapSort(arr) {
    const swaps = [];

    function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            swaps.push([i, largest]);
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(arr, n, largest);
        }
    }

    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
        heapify(arr, size, i);
    }

    for (let i = size - 1; i > 0; i--) {
        swaps.push([0, i]);
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }

    return swaps;
}


// Quick Sort algorithm
function quickSort(arr) {
    const swaps = [];
    
    function partition(low, high) {
        const pivot = arr[Math.floor((high + low) / 2)];
        let i = low;
        let j = high;

        while (i <= j) {
            while (arr[i] < pivot) i++;
            while (arr[j] > pivot) j--;

            if (i <= j) {
                swaps.push([i, j]);
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
                j--;
            }
        }
        return i;
    }

    function sort(low, high) {
        if (low < high) {
            const index = partition(low, high);
            sort(low, index - 1);
            sort(index, high);
        }
    }

    sort(0, arr.length - 1);
    return swaps;
}
