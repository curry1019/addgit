<template>
	<div class="playback_box">
        <Header activeIndex="3"></Header>
		<div class="content_box">
            <div v-show="!isPlaying" class="table_box">
                <div class="search_box">
                    <div class="search_title">会议回放</div>
                    <div class="input_box">
                        <el-input placeholder="查询会议" size="small" v-model="name" clearable class="input-with-select">
                            <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </div>
                <div class="table_box">
                    <div class="delete_line">
                        <span style="margin-right: 27px;cursor: pointer;" @click="batchDelete">
                            <i class="el-icon-warning"></i>
                            <span>批量删除</span>
                        </span>
                    </div>
                    <div class="table_list">
                        <el-table ref="multipleTable" :data="rows" tooltip-effect="dark" style="width: 100%;font-size:12px" @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            <el-table-column type="index" label="序号" width="55" align="center">
                            </el-table-column>
                            <el-table-column prop="conferenceName" label="会议名称" min-width="180" align="center">
                            </el-table-column>
                            <el-table-column prop="length" label="会议时长" min-width="100" align="center">
                            </el-table-column>
                            <el-table-column prop="beginTime" label="会议起始时间"  min-width="150" align="center">
                            </el-table-column>
                            <el-table-column prop="endTime" label="会议结束时间"  min-width="150" align="center">
                            </el-table-column>
                            <el-table-column min-width="200" fixed="right" label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button class="table_btn" @click="edit(scope.row)" type="text" size="small"><i class="el-icon-edit-outline"></i>编辑</el-button>
                                    <el-button class="table_btn" @click="playing(scope.row)" type="text" size="small"><i class="el-icon-video-play"></i>播放</el-button>
                                    <el-button class="table_btn" @click="remove(scope.row)" type="text" size="small"><i class="el-icon-delete"></i>删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="toolbar">
                            <pagination :current-page = page :page-sizes = [10,20,30,40,50,100] :page-size = pageSize :total = total @sizeChange = "sizeChange" @currentChange = "currentChange"></pagination>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="isPlaying" class="playing_box">
                <div class="playing_title">
                    <div class="playing_title_left">
                        <img src="../../../assets/images/playback/Identification_playback@2x.png" width="40" height="20" alt="..." />
					    <span>{{playingTitle}}</span>
                    </div>
					<img class="goback_logo" @click="goBack" src="../../../assets/images/playback/btn_goback@2x.png" width="40" height="30" alt="..." />
				</div>
				<div id="video-container" style="margin: 0px auto;"></div>
            </div>
        </div>
	</div>
</template>

<script>
    import pagination from '@/components/common/Pagination/Pagination.vue'
    import Header from '@/components/common/header/header'
    import Base from '@/base/base.vue'
    import API from '@/axios/service/playback'
	export default Base.extend({
    data() {
        return {
            total: 0, //列表总条数
            page: 1, //当前页码
            pageSize: 10,
            name: "", // 会议名称
            rows:[],
            multipleSelection: [], // 表格选中的列
            isPlaying: false, // 是否显示播放页面
            playingTitle: '博大经开建筑施工设计稿图修改意见会议', // 视频回放标题
            width: 0,
            height: 0,
        }
    },
    components: {
        pagination,
        Header
    },
    methods: {
        // 分页改变后进行查询
        currentChange(val) {
            this.page = val;
            this.search();
        },
        sizeChange(val) {
            this.pageSize = val;
            this.search();
        },
        // 查询按钮逻辑
        handleSearch() {
            this.page = 1;
            this.search()
        },
        search() {
            var that = this
            var params = {
                pageNum: that.page,
                pageSize: that.pageSize,
                data:{name: that.name}
            }
            API.listVideoInfo(params).then((res)=>{
                if(res.code == 0) {
                    var result = res.data
                    that.total = result.total
                    that.rows = result.records
                }else {
                    
                }
            }).catch((err)=>{
                this.$message.error(err);
            });
        },
        // 编辑
        edit(row) {
            var that = this;
            this.$prompt("请输入会议名称", "编辑", {
                    confirmButtonText: "确定",
                    inputValue: row.conferenceName,
                    cancelButtonText: "取消",
                    closeOnClickModal: false
                })
                .then(({
                    value
                }) => {
                    if(value.trim()) {
                        console.log(value)
                        var params = {
                            id: row.id,
                            data:{name: value}
                        }
                        API.editVideoInfo(params).then((res)=>{
                            if(res.code == 0) {
                                that.$message.success({
									showClose: true,
									message: "修改成功",
									duration: 2000
								});
								that.search()
                            }else {

                            }
                        }).catch((err)=>{
                            this.$message.error(err);
                        });
                    } else {
                        that.$message.error({
                            showClose: true,
                            message: "你输入的内容为空！",
                            duration: 2000
                        });
                    }
                })
                .catch(() => {});
        },
        // 播放
        playing(row) {
            this.playingTitle = row.conferenceName
            var options = {
				rtmp: "",
				flv: "",
				m3u8: "",
				mp4: row.videoUrl,
				autoplay: true,
				live: false,
				// poster : "http://www.test.com/myimage.jpg",
				width: this.width,
				height: this.height,
				volume: 0.5,
				flash: true,
				flashUrl: "",
				x5_player: false,
				h5_flv: false,
				controls: 'system',
				wording: {
					2032: '请求视频失败，请检查网络',
					2048: '请求m3u8文件失败，可能是网络错误或者跨域问题'
				},
				listener: function(msg) {

				}
			};
            window.tcplayer = new TcPlayer('video-container', options);
            this.isPlaying = true
        },
        // 删除
        remove(row) {
            var that = this
            this.$confirm("确认删除这条会议记录吗?", "提示", {
                confirmButtonClass: "el-button--warning",
                closeOnClickModal: false
            }).then(() => {
                var params = []
                params[0] = row.id
                API.removeVideoInfo(params).then((res)=>{
                    if(res.code == 0) {
                        that.$message.success({
                            showClose: true,
                            message: "删除成功",
                            duration: 2000
                        });
                        that.search()
                    }else {

                    }
                }).catch((err)=>{
                    this.$message.error(err);
                });
            }).catch(() => {});
        },
        // 批量删除
        batchDelete() {
            var that = this
            if(that.multipleSelection.length == 0) {
                return
            }
            that.$confirm("确认删除选中的会议记录吗?", "提示", {
                confirmButtonClass: "el-button--warning",
                closeOnClickModal: false
            }).then(() => {
                var params = []
                that.multipleSelection.forEach(item => {
                    params.push(item.id)
                })
                API.removeVideoInfo(params).then((res)=>{
                    if(res.code == 0) {
                        that.$message.success({
                            showClose: true,
                            message: "批量删除成功",
                            duration: 2000
                        });
                        that.search()
                    }else {

                    }
                }).catch((err)=>{
                    that.$message.error(err);
                });
            }).catch(() => {});
        },
        // 表格选中逻辑
        handleSelectionChange(val) {
            this.multipleSelection = val
            console.log(this.multipleSelection)
        },
        // 返回列表页
        goBack() {
            this.isPlaying = false
            window.tcplayer.destroy()
        },
        // 获取宽高
        getWidth() {
            this.width = document.querySelector('.content_box').clientWidth
			this.height = document.querySelector('.content_box').clientHeight - 61
        }
    },
    mounted() {
         this.getWidth()
         this.search()
    },
    beforeDestroy() {
        window.tcplayer.destroy()
	}
})
</script>

<style lang="less" scoped>
    .playback_box {
        width: 100vw;
        height: 100vh;
        font-family:PingFangSC-Regular;
        background: #F5F7FA;
        .header {
            width: 100%;
            height: 70px;
            background: #585553;
        }
        .content_box {
            box-sizing: border-box;
            width: calc(100vw - 120px);
            height: calc(100vh - 160px);
            margin: 30px 60px 60px 60px;
            border-radius: 8px 8px 0px 0px;
            overflow-y: auto;
            background: #fff;
            .search_box {
                display: flex;
                justify-content: space-between;
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid #EDEFF2;
                .search_title {
                    margin-left: 40px;
                    font-size: 16px;
                    color: #303133;
                } 
                .input_box {
                    width: 300px;
                    margin-right: 21px;
                }
            }
        }
        .table_box {
           
            .delete_line {
                height: 50px;
                margin-top: 15px;
                line-height: 50px;
                text-align: right;
                color: #F88800;
                font-size: 14px;
                i {
                    font-size: 18px;
                    vertical-align: middle;
                }
                span {
                    vertical-align: middle;
                }
            }
            .table_list {
                box-sizing: border-box;
                padding: 0 20px 0 30px;
            }
            .table_btn {
                color: #606266;
                i {
                    margin-right: 4px;
                }
            }
        }
        .playing_box {
            .playing_title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 60px;
                line-height: 60px;
				border-bottom: 1px solid #EDEFF2;
				background: #535B6E;
				color: #F5F7FA;
                .playing_title_left {
                    margin-left: 40px;
                    img {
                        vertical-align: middle;
                    }
                    span {
                        vertical-align: middle;
                    }
                } 
                .goback_logo {
                    display: block;
                    margin-right: 40px;
                    cursor: pointer;
                }
            } 
        } 
    }
</style>