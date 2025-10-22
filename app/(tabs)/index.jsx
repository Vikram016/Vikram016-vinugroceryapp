 import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  SafeAreaViewBase,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import Product from "../../components/Product";
import message from "../../components/Message";
import Header from "../../components/Header";

import { Colors } from "../../constants/Utils";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

const Home = () => {
  const { keyword = "", pageNumber = "1" } = useLocalSearchParams();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    keyword,
    pageNumber: Number(pageNumber),
  });
};

useEffect(() => {
  refetch();
}, [keyword, pageNumber, refetch]);

const renderPaginationButtons = () => {
  if (!data?.pages || data.pages <= 1) return null;
};

return (
  <View style={styles.paginationContainer}>
    {Array.from({ length: data.pages }, (_, i) => i + 1).map((page) => (
      <TouchableOpacity
        key={page}
        style={[
          styles.pageButton,
          page === data.page && styles.activePageButton,
        ]}
        onPress={() => {
          router.setParams({
            pageNumber: page.toString(),
            ...(keyword ? { keyword } : {}),
          });
        }}
      >
        <Text
          style={[
            styles.pageButtonText,
            page === data.page && styles.activePageButtonText,
          ]}
        >
          {page}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const ListHeader = () => (
  <>
    <Header />
    {error && (
      <message variant="error" style={styles.errorMessage}>
        {error?.data?.message || error.error || "Failed to Fetch products"}
      </message>
    )}
  </>
);

const ListFooter = () => renderPaginationButtons();

return (
  <SafeAreaView style={styles.safeArea}>
    {isLoading ? (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    ) : (
      <FlatList
        data={data?.Products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Product product={item} />}
        contentContainerStyle={styles.list}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<ListHeader />}
        ListFooterComponent={<ListFooter />}
        ListEmptyComponent={
          !error && (
            <Message variant="info" style={styles.emptyMessage}>
              No Products Found
            </Message>
          )
        }
      />
    )}
  </SafeAreaView>
);

export default Home;

const styles = StyleSheet.create({
  safeArea:{
    flex:1,
    backgroundColor:Colors.offWhite,
    paddingTop:Platform.OS === "android" ? 25 : 0;
  },
  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  errorMessage:{
    marginHorizontal:10,
    marginBottom:10,
  },
  emptyMessage:{
    marginTop:20,
    alignSelf:"center",
  },
  list:{
    paddingBottom: 20,
    paddingHorizontal:10,
  },
  columnWarapper:{
    justifyContent:"space-between",
    marginBottom:15,
  },
  paginationContainer:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    paddingVertical:20,
    flexWrap:"wrap",
    gap:10,
  },
pageButton:{
  paddingHorizontal:12,
  paddingVertical:8,
  borderRadius:20,
  background:Colors.white,
  borderWidth:1,
  borderColor:Colors.primary,
  minWigth:40,
  alignItems:"center",
},
activePageButton:{
  backgroundColor:Colors.primary
},
pageButtonText:{
  color:Colors.primary,
  fontWeight:"600"
},
activePageButtonText:{
  color:Colors.white,
},

});