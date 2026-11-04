<!-- SizeGuideTab.vue -->
<template>
  <div>
    <p class="text-muted mb-3">This product runs true to size.</p>

    <!-- shoes 男女分開 -->
    <template v-if="category === 'shoes'">
      <h6 class="fw-bold">Men</h6>
      <table class="table table-bordered text-center mb-3">
        <thead class="table-light">
          <tr>
            <th>US</th>
            <th>EU</th>
            <th>CM</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>7</td>
            <td>40</td>
            <td>25</td>
          </tr>
          <tr>
            <td>8</td>
            <td>41</td>
            <td>26</td>
          </tr>
          <tr>
            <td>9</td>
            <td>42</td>
            <td>27</td>
          </tr>
          <tr>
            <td>10</td>
            <td>43</td>
            <td>28</td>
          </tr>
        </tbody>
      </table>
      <h6 class="fw-bold">Women</h6>
      <table class="table table-bordered text-center">
        <thead class="table-light">
          <tr>
            <th>US</th>
            <th>EU</th>
            <th>CM</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>6</td>
            <td>37</td>
            <td>23.5</td>
          </tr>
          <tr>
            <td>7</td>
            <td>38</td>
            <td>24</td>
          </tr>
          <tr>
            <td>8</td>
            <td>39</td>
            <td>25</td>
          </tr>
        </tbody>
      </table>
    </template>

    <!-- apparel 男女分開 -->
    <template v-else-if="category === 'apparel'">
      <h6 class="fw-bold">Men</h6>
      <table class="table table-bordered text-center mb-3">
        <thead class="table-light">
          <tr>
            <th>Size</th>
            <th>Chest</th>
            <th>Waist</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>S</td>
            <td>84–88</td>
            <td>68–72</td>
          </tr>
          <tr>
            <td>M</td>
            <td>88–92</td>
            <td>72–76</td>
          </tr>
          <tr>
            <td>L</td>
            <td>92–96</td>
            <td>76–80</td>
          </tr>
          <tr>
            <td>XL</td>
            <td>96–100</td>
            <td>80–84</td>
          </tr>
        </tbody>
      </table>
      <h6 class="fw-bold">Women</h6>
      <table class="table table-bordered text-center">
        <thead class="table-light">
          <tr>
            <th>Size</th>
            <th>Chest</th>
            <th>Waist</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>S</td>
            <td>80–84</td>
            <td>62–66</td>
          </tr>
          <tr>
            <td>M</td>
            <td>84–88</td>
            <td>66–70</td>
          </tr>
          <tr>
            <td>L</td>
            <td>88–92</td>
            <td>70–74</td>
          </tr>
        </tbody>
      </table>
    </template>

    <!-- 其他分類 -->
    <template v-else>
      <p class="text-muted">Please refer to our size guide for the best fit.</p>
    </template>
  </div>
</template>

<script>
export default {
  props: ["category"],
};
</script>
