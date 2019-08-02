import {$get, $post} from '@/axios/base/';

/**
 * 获取回放列表
 * @param params
 */
export function listVideoInfo(params) {
    return $post(`/conference-video-info/listVideoInfo/${params.pageNum}/${params.pageSize}`, params.data);
}