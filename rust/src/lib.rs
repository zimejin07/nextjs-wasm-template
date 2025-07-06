use wasm_bindgen::prelude::*;
use serde::Serialize;

#[wasm_bindgen]
pub fn extract_keywords(text: &str) -> JsValue {
    let keywords = text.split_whitespace()
                       .filter(|w| w.len() > 4)
                       .map(|w| w.to_lowercase())
                       .collect::<Vec<String>>();
    JsValue::from_serde(&keywords).unwrap()
}
