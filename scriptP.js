const size = 50;
let arrBubble = [], arrInsertion = [], arrSelection = [], arrHeap = [], arrQuick = [];

function initArrays() {
    for (let i = 0; i < size; i++) {
        const value = Math.random();
        arrBubble[i] = value;
        arrInsertion[i] = value;
        arrSelection[i] = value;
        arrHeap[i] = value;
        arrQuick[i] = value;
    }
    showAllBars();
}

function playAll() {
    const bubbleSwaps = bubbleSort([...arrBubble]);
    const insertionSwaps = insertionSort([...arrInsertion]);
    const selectionSwaps = selectionSort([...arrSelection]);
    const heapSwaps = heapSort([...arrHeap]);
    const quickSwaps = quickSort([...arrQuick]);

    // Run animations for all sorts concurrently
    animate(bubbleSwaps, arrBubble, 'containerBubble');
    animate(insertionSwaps, arrInsertion, 'containerInsertion');
    animate(selectionSwaps, arrSelection, 'containerSelection');
    animate(heapSwaps, arrHeap, 'containerHeap');
    animate(quickSwaps, arrQuick, 'containerQuick');
}

function animate(swaps, arr, containerId) {
    const container = document.getElementById(containerId);
    if (swaps.length === 0) {
        showBars(arr, container, []); // Show final sorted array
        return;
    }
    const [i, j] = swaps.shift();
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    showBars(arr, container, [i, j]); // Show bars with highlighted swap

    setTimeout(() => {
        animate(swaps, arr, containerId); // Continue the animation
    }, 7); // Adjust delay if necessary
}

function showAllBars() {
    // Show the initial bars for each sorting algorithm
    showBars(arrBubble, document.getElementById('containerBubble'), []);
    showBars(arrInsertion, document.getElementById('containerInsertion'), []);
    showBars(arrSelection, document.getElementById('containerSelection'), []);
    showBars(arrHeap, document.getElementById('containerHeap'), []);
    showBars(arrQuick, document.getElementById('containerQuick'), []);
}

function showBars(arr, container, indices) {
    container.innerHTML = ''; // Clear the container
    for (let i = 0; i < size; i++) {
        const bar = document.createElement('div');
        bar.style.height = arr[i] * 90 + '%'; // Set bar height
        bar.style.width = '5px'; // Bar width
        bar.style.margin = '1px'; // Space between bars
        bar.style.backgroundColor = indices.includes(i) ? 'red' : 'black'; // Highlight if being swapped
        container.appendChild(bar); // Append the bar to the container
    }
}

// Sorting algorithms: bubbleSort, insertionSort, selectionSort, heapSort, quickSort
// These functions return a list of swaps to animate the sorting process

function bubbleSort(arr) {
    const swaps = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swaps.push([j, j + 1]);
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return swaps;
}

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

function selectionSort(arr) {
    const swaps = [];
    const size = arr.length;  // Ensure we're using the correct array length
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

// Initialize arrays and display the bars
initArrays();
function playAll() {
    // Play the audio when sorting starts
    const audio = document.getElementById('sortAudio');
    audio.play();

    // Sorting algorithms
    const bubbleSwaps = bubbleSort([...arrBubble]);
    const insertionSwaps = insertionSort([...arrInsertion]);
    const selectionSwaps = selectionSort([...arrSelection]);
    const heapSwaps = heapSort([...arrHeap]);
    const quickSwaps = quickSort([...arrQuick]);

    // Run animations for all sorts concurrently
    animate(bubbleSwaps, arrBubble, 'containerBubble');
    animate(insertionSwaps, arrInsertion, 'containerInsertion');
    animate(selectionSwaps, arrSelection, 'containerSelection');
    animate(heapSwaps, arrHeap, 'containerHeap');
    animate(quickSwaps, arrQuick, 'containerQuick');

    // Stop the audio when the sorting is finished
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0; // Reset the audio to the start
    }, calculateTotalAnimationTime());
}

function calculateTotalAnimationTime() {
    const totalSwaps = arrBubble.length + arrInsertion.length + arrSelection.length + arrHeap.length + arrQuick.length;
    return totalSwaps * 30; // Assuming 20ms per swap
}
