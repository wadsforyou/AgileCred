import React from "react";
import { useParams, Navigate } from "react-router-dom";
import LoanPageTemplate from "@/components/LoanPageTemplate";
import { getCategoryBySlug } from "@/data/loanCategories";

export default function LoanCategory() {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);
  if (!category) return <Navigate to="/loans" replace />;
  return <LoanPageTemplate category={category} />;
}