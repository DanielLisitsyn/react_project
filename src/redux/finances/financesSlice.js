import { createSlice } from "@reduxjs/toolkit";
import {
  allTransactions,
  getSummary,
  getCategories,
  addTransaction,
} from "./finances-operations";
import { logout, current } from "redux/auth/auth-operations";
import { toast } from "react-toastify";

const initialState = {
  data: null,
  totalBalance: null,
  summary: null,
  error: null,
  categories: null,
  loading: false,
};

const colors = [
  "rgba(254, 208, 87, 1)",
  "rgba(255, 216, 208, 1)",
  "rgba(255, 190, 177, 1)",
  "rgba(253, 148, 152, 1)",
  "rgba(197, 186, 255, 1)",
  "rgba(110, 120, 232, 1)",
  "rgba(74, 86, 226, 1)",
  "rgba(129, 225, 255, 1)",
  "rgba(36, 204, 167, 1)",
  "rgba(0, 173, 132, 1)",
  "rgba(0, 200, 132, 1)",
];
const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allTransactions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(allTransactions.rejected, (state, { payload }) => {
        state.loading = false;
        console.log("allTransactions", payload);
        state.error = payload;
        if (payload) {
          toast.error("Fatal error");
        }
      })
      .addCase(getSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSummary.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.summary = payload;
      })
      .addCase(getSummary.rejected, (state, { payload }) => {
        state.loading = false;
        console.log("getSummary", payload);
        state.error = payload;
        if (payload) {
          toast.error("Fatal error");
        }
      })
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload.map((obj, i) => {
          return obj.type === "EXPENSE"
            ? { ...obj, backgroundColor: colors[i] }
            : obj;
        });
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.loading = false;
        console.log("getCategories", payload);
        state.error = payload;
        if (payload) {
          toast.error("Fatal error");
        }
      })
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          toast.success("Add successfull");
        } else {
          toast.error("Try later");
        }
        state.data = [...state.data, payload];
        state.totalBalance = payload.balanceAfter;
      })
      .addCase(addTransaction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        console.log("addTransaction", payload);
        if (payload === "Request failed with status code 409") {
          toast.error("Error, try another one");
        } else {
          toast.error("Try later");
        }
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
        state.totalBalance = null;
        state.summary = null;
        state.error = null;
        state.categories = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          toast.error("you are not authorized");
        } else {
          toast.error("try later");
        }
        state.error = payload;
      })
      .addCase(current.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(current.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.totalBalance = payload.balance;
      })
      .addCase(current.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// const financeSlice = createSlice({
//   name: "finance",
//   initialState,
//   extraReducers: {
//     [allTransactions.pending]: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     [allTransactions.fulfilled]: (state, { payload }) => {
//       state.loading = false;
//       state.data = payload;
//     },
//     [allTransactions.rejected]: (state, { payload }) => {
//       state.loading = false;
//       console.log("allTransactions", payload);
//       state.error = payload;
//       if (payload) {
//         toast.error("Fatal error");
//       }
//     },
//     [getSummary.pending]: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     [getSummary.fulfilled]: (state, { payload }) => {
//       state.loading = false;
//       state.summary = payload;
//     },
//     [getSummary.rejected]: (state, { payload }) => {
//       state.loading = false;
//       console.log("getSummary", payload);
//       state.error = payload;
//       if (payload) {
//         toast.error("Fatal error");
//       }
//     },

//     [getCategories.pending]: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     [getCategories.fulfilled]: (state, { payload }) => {
//       state.loading = false;
//       state.categories = payload.map((obj, i) => {
//         return obj.type === "EXPENSE"
//           ? { ...obj, backgroundColor: colors[i] }
//           : obj;
//       });
//     },
//     [getCategories.rejected]: (state, { payload }) => {
//       state.loading = false;
//       console.log("getCategories", payload);
//       state.error = payload;
//       if (payload) {
//         toast.error("Fatal error");
//       }
//     },
//     [addTransaction.pending]: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     [addTransaction.fulfilled]: (state, { payload }) => {
//       state.loading = false;
//       if (payload) {
//         toast.success("Add successfull");
//       } else {
//         toast.error("Try later");
//       }
//       state.data = [...state.data, payload];
//       state.totalBalance = payload.balanceAfter;
//     },
//     [addTransaction.rejected]: (state, { payload }) => {
//       state.loading = false;
//       state.error = payload;
//       console.log("addTransaction", payload);
//       if (payload === "Request failed with status code 409") {
//         toast.error("Error, try another one");
//       } else {
//         toast.error("Try later");
//       }
//     },
//     [logout.pending]: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     [logout.fulfilled]: (state) => {
//       state.loading = false;
//       state.data = null;
//       state.totalBalance = null;
//       state.summary = null;
//       state.error = null;
//       state.categories = null;
//     },
//     [logout.rejected]: (state, { payload }) => {
//       state.loading = false;
//       if (payload) {
//         toast.error("you are not authorized");
//       } else {
//         toast.error("try later");
//       }
//       state.error = payload;
//     },

//     [current.pending]: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     [current.fulfilled]: (state, { payload }) => {
//       state.loading = false;
//       state.totalBalance = payload.balance;
//     },
//     [current.rejected]: (state, { payload }) => {
//       state.loading = false;
//       state.error = payload;
//     },
//   },
// });

export const { resetFinance } = financeSlice.actions;
export const financeReducer = financeSlice.reducer;
